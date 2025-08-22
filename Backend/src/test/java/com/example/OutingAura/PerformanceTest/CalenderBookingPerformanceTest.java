package com.example.OutingAura.PerformanceTest;

import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

public class CalenderBookingPerformanceTest {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:8080/api/booking";

    @Test
    public void testBookingPerformance() {
        int totalRequests = 100;
        long startTime = System.currentTimeMillis();

        for (int i = 0; i < totalRequests; i++) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> request = new HashMap<>();
            request.put("eventType", "TestEvent");
            request.put("date", "2025-06-10");
            request.put("time", "14:00");
            request.put("userEmail", "user" + i + "@test.com");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            try {
                ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
                System.out.println("Request " + i + " status: " + response.getStatusCode());
            } catch (Exception e) {
                System.out.println("Request " + i + " failed: " + e.getMessage());
            }
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Total time for " + totalRequests + " requests: " + (endTime - startTime) + " ms");
    }
}

