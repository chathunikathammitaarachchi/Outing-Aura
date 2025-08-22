package com.example.OutingAura.controller;

import com.example.OutingAura.model.CalenderBooking;
import com.example.OutingAura.service.CalenderBookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:5173") // React Vite default port
public class CalenderBookingController {

    @Autowired
    private CalenderBookingService calenderbookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody CalenderBooking calenderbooking) {
        try {
            CalenderBooking savedBooking = calenderbookingService.saveBooking(calenderbooking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
