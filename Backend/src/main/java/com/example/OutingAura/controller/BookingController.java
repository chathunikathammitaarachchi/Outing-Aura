package com.example.OutingAura.controller;

import com.example.OutingAura.model.Booking;
import com.example.OutingAura.repository.BookingRepository;
import com.example.OutingAura.service.BookingService;
import com.example.OutingAura.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/rbookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private NotificationService notificationService;

    private final BookingRepository bookingRepository;



    




    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> saveBooking(@RequestBody Booking booking) {
        booking.setStatus("Pending");
        bookingRepository.save(booking);
        return ResponseEntity.ok("Booking saved successfully");
    }

    @GetMapping("/history")
    public ResponseEntity<List<Booking>> getBookingHistory(@RequestParam String email) {
        List<Booking> bookings = bookingRepository.findByUserEmail(email);
        return ResponseEntity.ok(bookings);
    }

@PatchMapping("/{id}")
public ResponseEntity<Booking> updateBookingStatus(
        @PathVariable("id") String bookingId,
        @RequestBody Map<String, String> request) {

    String newStatus = request.get("status");
    String rejectionReason = request.get("rejectionReason");

    Booking updatedBooking = bookingService.updateBookingStatus(bookingId, newStatus);

    // Send confirmation or rejection email here
    if ("Rejected".equalsIgnoreCase(newStatus) && rejectionReason != null) {
        updatedBooking.setRejectionReason(rejectionReason);
        // send rejection email
        notificationService.sendRejectionNotification(updatedBooking, rejectionReason);
    } else if ("Accepted".equalsIgnoreCase(newStatus)) {
        // Generate password and send confirmation email
        String generatedPassword = generatePassword();
        notificationService.sendConfirmationNotification(updatedBooking, generatedPassword);
    }

    return ResponseEntity.ok(updatedBooking);
}



    private String generatePassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
