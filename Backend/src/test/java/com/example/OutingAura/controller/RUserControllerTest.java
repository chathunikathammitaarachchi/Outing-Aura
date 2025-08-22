package com.example.OutingAura.controller;

import com.example.OutingAura.model.RUser;
import com.example.OutingAura.repository.RUserRepository;
import com.example.OutingAura.service.REmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

class RUserControllerTest {

    @InjectMocks
    private RUserController rUserController;

    @Mock
    private RUserRepository rUserRepository;

    @Mock
    private REmailService emailService;

    private RUser testUser;

    @BeforeEach
    void setUp() {
        initMocks(this);
        testUser = new RUser();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setConfirmPassword("password123");
        testUser.setName("Test User");
    }

    @Test
    void signup_shouldSucceed_whenValidInput() {
        when(rUserRepository.existsByEmail(testUser.getEmail())).thenReturn(false);

        ResponseEntity<?> response = rUserController.signup(testUser);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User registered successfully!", response.getBody());
        verify(rUserRepository, times(1)).save(testUser);
    }

    @Test
    void signup_shouldFail_whenEmailAlreadyExists() {
        when(rUserRepository.existsByEmail(testUser.getEmail())).thenReturn(true);

        ResponseEntity<?> response = rUserController.signup(testUser);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("This email is already registered. Please log in.", response.getBody());
    }

    @Test
    void login_shouldSucceed_withValidCredentials() {
        when(rUserRepository.findByEmail(testUser.getEmail())).thenReturn(testUser);

        ResponseEntity<?> response = rUserController.login(testUser);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(testUser, response.getBody());
    }

    @Test
    void login_shouldFail_withIncorrectPassword() {
        RUser wrongPassUser = new RUser();
        wrongPassUser.setEmail("test@example.com");
        wrongPassUser.setPassword("wrongpass");

        when(rUserRepository.findByEmail(wrongPassUser.getEmail())).thenReturn(testUser);

        ResponseEntity<?> response = rUserController.login(wrongPassUser);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Your password is incorrect.", response.getBody());
    }

    @Test
    void forgotPassword_shouldSendEmail_whenUserExists() {
        when(rUserRepository.findByEmail(testUser.getEmail())).thenReturn(testUser);

        ResponseEntity<?> response = rUserController.forgotPassword(testUser);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Password reset email sent. Please check your inbox.", response.getBody());
        verify(emailService, times(1)).sendEmail(eq(testUser.getEmail()), anyString(), contains("http://localhost:5173/update-password"));
    }

    @Test
    void resetPassword_shouldSucceed_withValidToken() {
        String token = UUID.randomUUID().toString();
        testUser.setResetPasswordToken(token);
        testUser.setResetPasswordTokenExpiration(LocalDateTime.now().plusMinutes(30));

        RUser resetRequest = new RUser();
        resetRequest.setPassword("newPass123");
        resetRequest.setConfirmPassword("newPass123");

        when(rUserRepository.findByResetPasswordToken(token)).thenReturn(testUser);

        ResponseEntity<?> response = rUserController.resetPassword(token, resetRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Password reset successfully!", response.getBody());
        verify(rUserRepository).save(testUser);
    }

    @Test
    void getUser_shouldReturnUser_whenExists() {
        when(rUserRepository.findById(testUser.getEmail())).thenReturn(Optional.of(testUser));

        ResponseEntity<?> response = rUserController.getUser(testUser.getEmail());

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(testUser, response.getBody());
    }

    @Test
    void getUser_shouldReturn404_whenNotExists() {
        when(rUserRepository.findById("unknown@example.com")).thenReturn(Optional.empty());

        ResponseEntity<?> response = rUserController.getUser("unknown@example.com");

        assertEquals(404, response.getStatusCodeValue());
    }
}
