package com.example.OutingAura.controller;

import com.example.OutingAura.model.CalenderBooking;
import com.example.OutingAura.service.CalenderBookingService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CalenderBookingController.class)
public class CalenderBookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CalenderBookingService calenderbookingService;

    @Autowired
    private ObjectMapper objectMapper;

   @Test
public void testCreateBooking_Success() throws Exception {
    // Given
    CalenderBooking booking = new CalenderBooking();
    booking.setId("1");
    booking.setEvent("Birthday");
    booking.setDate("2025-06-10");
    booking.setTime("10:00 AM");

    Mockito.when(calenderbookingService.saveBooking(any(CalenderBooking.class)))
            .thenReturn(booking);

    // When & Then
    mockMvc.perform(post("/api/booking")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(booking)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.event").value("Birthday"))
            .andExpect(jsonPath("$.date").value("2025-06-10"))
            .andExpect(jsonPath("$.time").value("10:00 AM"));
}


    @Test
    public void testCreateBooking_Failure() throws Exception {
        // Given
        CalenderBooking booking = new CalenderBooking();
        booking.setEvent("Birthday");
        booking.setDate("2025-06-10");
        booking.setTime("10:00 AM");

        Mockito.when(calenderbookingService.saveBooking(any(CalenderBooking.class)))
                .thenThrow(new RuntimeException("Booking conflict"));

        // When & Then
        mockMvc.perform(post("/api/booking")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(booking)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Booking conflict"));
    }
}
