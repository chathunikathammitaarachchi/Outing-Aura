package com.example.OutingAura.controller;

import com.example.OutingAura.model.RBookings;
import com.example.OutingAura.repository.RPackageRepository;
import com.example.OutingAura.service.RBookingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RBookingController.class)
public class RBookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RPackageRepository rPackageRepository;

    @MockBean
    private RBookingService rBookingService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateBooking_Success() throws Exception {
        // Create booking request object
        RBookings bookingRequest = new RBookings();
        bookingRequest.setPackageId("123");
        bookingRequest.setCustomerName("John Doe");
       

        // Mock repository and service behavior
        when(rPackageRepository.existsById("123")).thenReturn(true);

        RBookings savedBooking = new RBookings();
        savedBooking.setId("booking001");
        savedBooking.setPackageId("123");
        savedBooking.setCustomerName("John Doe");
       

        when(rBookingService.createBooking(any(RBookings.class))).thenReturn(savedBooking);

        // Perform the POST request
        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookingRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("booking001"))
                .andExpect(jsonPath("$.packageId").value("123"))
                .andExpect(jsonPath("$.customerName").value("John Doe"));
          
    }

    @Test
    public void testCreateBooking_MissingPackageId() throws Exception {
        RBookings bookingRequest = new RBookings();  // Missing packageId

        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookingRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("packageId is missing"));
    }

    @Test
    public void testCreateBooking_PackageNotFound() throws Exception {
        RBookings bookingRequest = new RBookings();
        bookingRequest.setPackageId("nonexistent");

        when(rPackageRepository.existsById("nonexistent")).thenReturn(false);

        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookingRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Package not found for ID: nonexistent"));
    }
}
