package com.example.OutingAura.service;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OutingAura.model.Booking;
import com.example.OutingAura.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

   public Booking updateBookingStatus(String bookingId, String newStatus) {
    Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
    if (optionalBooking.isPresent()) {
        Booking booking = optionalBooking.get();
        booking.setStatus(newStatus);

        // optional: set rejectionReason here if provided in controller

        return bookingRepository.save(booking);
    } else {
        throw new RuntimeException("Booking not found with ID: " + bookingId);
    }
}


}


  
 

