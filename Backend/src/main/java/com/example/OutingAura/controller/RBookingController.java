package com.example.OutingAura.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.OutingAura.model.RBookings;
import com.example.OutingAura.repository.RPackageRepository;
import com.example.OutingAura.service.RBookingService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/bookings")
public class RBookingController {

        @Autowired
        private RPackageRepository rpackageRepository;

        @Autowired
        private RBookingService rbookingService;

        @PostMapping
        public ResponseEntity<?> createBooking(@RequestBody RBookings bookingRequest) {
                System.out.println("Booking request received: " + bookingRequest);

                // Existing validation
                if (bookingRequest.getPackageId() == null) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("packageId is missing");
                }

                if (!rpackageRepository.existsById(bookingRequest.getPackageId())) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body("Package not found for ID: " + bookingRequest.getPackageId());
                }

                try {
                        RBookings savedBooking = rbookingService.createBooking(bookingRequest);
                        return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
                } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Booking failed: " + e.getMessage());
                }
        }







}
