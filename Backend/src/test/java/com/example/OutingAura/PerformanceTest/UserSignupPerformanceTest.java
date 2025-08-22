package com.example.OutingAura.PerformanceTest;



import com.example.OutingAura.model.RUser;
import com.example.OutingAura.repository.RUserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.*;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserSignupPerformanceTest {

    private static final int NUM_REQUESTS = 100;
    private static final String SIGNUP_URL = "http://localhost:8080/api/users/signup";

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private RUserRepository ruserRepository;

    @BeforeAll
    public void setup() {
        // Clear the user repository before test
        ruserRepository.deleteAll();
    }

    @Test
    public void testConcurrentUserSignups() throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(20);
        CountDownLatch latch = new CountDownLatch(NUM_REQUESTS);

        IntStream.range(0, NUM_REQUESTS).forEach(i -> {
            executor.submit(() -> {
                try {
                    RUser newUser = new RUser();
                    newUser.setEmail("testuser" + i + "@example.com");
                    newUser.setName("Test User " + i);
                    newUser.setPassword("password123");
                    newUser.setConfirmPassword("password123");
                    newUser.setCategory("user");

                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    HttpEntity<RUser> request = new HttpEntity<>(newUser, headers);

                    ResponseEntity<String> response = restTemplate.postForEntity(SIGNUP_URL, request, String.class);

                    // Expect 200 OK for each user signup
                    assertEquals(HttpStatus.OK, response.getStatusCode());

                } finally {
                    latch.countDown();
                }
            });
        });

        latch.await();
        executor.shutdown();

        // Verify that all 100 users were successfully saved in the repository
        long userCount = ruserRepository.count();
        System.out.println("Successful signups: " + userCount + "/" + NUM_REQUESTS);

        assertEquals(NUM_REQUESTS, userCount);
    }
}

