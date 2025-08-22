package com.example.OutingAura.controller;

import com.example.OutingAura.model.Booking;
import com.example.OutingAura.repository.BookingRepository;
import com.example.OutingAura.service.BookingService;
import com.example.OutingAura.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.lang.reflect.Field;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingControllerTest {

    @InjectMocks
    private BookingController bookingController;

    @Mock
    private BookingService bookingService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private BookingRepository bookingRepository;

  

@BeforeEach
void setUp() throws Exception {
    MockitoAnnotations.openMocks(this);
    bookingController = new BookingController(bookingRepository);

    Field bookingServiceField = BookingController.class.getDeclaredField("bookingService");
    bookingServiceField.setAccessible(true);
    bookingServiceField.set(bookingController, bookingService);

    Field notificationServiceField = BookingController.class.getDeclaredField("notificationService");
    notificationServiceField.setAccessible(true);
    notificationServiceField.set(bookingController, notificationService);
}


    @Test
    void testGetAllBookings() {
        List<Booking> mockBookings = Arrays.asList(new Booking(), new Booking());
        when(bookingRepository.findAll()).thenReturn(mockBookings);

        List<Booking> result = bookingController.getAllBookings();

        assertEquals(2, result.size());
        verify(bookingRepository, times(1)).findAll();
    }

    @Test
    void testSaveBooking() {
        Booking booking = new Booking();
        booking.setUserEmail("test@example.com");

        ResponseEntity<String> response = bookingController.saveBooking(booking);

        assertEquals("Booking saved successfully", response.getBody());
        assertEquals("Pending", booking.getStatus());
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    void testGetBookingHistory() {
        String email = "user@example.com";
        List<Booking> mockList = Collections.singletonList(new Booking());
        when(bookingRepository.findByUserEmail(email)).thenReturn(mockList);

        ResponseEntity<List<Booking>> response = bookingController.getBookingHistory(email);

        assertEquals(1, response.getBody().size());
        verify(bookingRepository).findByUserEmail(email);
    }

    @Test
    void testUpdateBookingStatus_Accepted() {
        String bookingId = "abc123";
        String status = "Accepted";

        Booking mockBooking = new Booking();
        mockBooking.setId(bookingId);
        mockBooking.setStatus(status);

        when(bookingService.updateBookingStatus(bookingId, status)).thenReturn(mockBooking);

        Map<String, String> request = new HashMap<>();
        request.put("status", status);

        ResponseEntity<Booking> response = bookingController.updateBookingStatus(bookingId, request);

        assertEquals(status, response.getBody().getStatus());
        verify(bookingService).updateBookingStatus(bookingId, status);
    }

    @Test
    void testUpdateBookingStatus_Rejected_WithReason() {
        String bookingId = "abc123";
        String status = "Rejected";
        String reason = "Date unavailable";

        Booking mockBooking = new Booking();
        mockBooking.setId(bookingId);
        mockBooking.setStatus(status);

        when(bookingService.updateBookingStatus(bookingId, status)).thenReturn(mockBooking);

        Map<String, String> request = new HashMap<>();
        request.put("status", status);
        request.put("rejectionReason", reason);

        ResponseEntity<Booking> response = bookingController.updateBookingStatus(bookingId, request);

        assertEquals(status, response.getBody().getStatus());
        assertEquals(reason, response.getBody().getRejectionReason());
        verify(bookingService).updateBookingStatus(bookingId, status);
    }
}
