package com.example.OutingAura.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OutingAura.model.RBookings;
import com.example.OutingAura.model.RPackage;
import com.example.OutingAura.model.RUser;
import com.example.OutingAura.repository.RBookingRepository;
import com.example.OutingAura.repository.RPackageRepository;
import com.example.OutingAura.repository.RUserRepository;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class RBookingService {
    @Autowired
    private RBookingRepository rbookingRepository;
@Autowired
private RPackageRepository rpackageRepository;

    @Autowired
    private RUserRepository ruserRepository;


    public RBookings createBooking(RBookings bookingRequest) {

        // Verify package exists
        RPackage rpackages = rpackageRepository.findById(bookingRequest.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));

        // Verify user
        RUser ruser = ruserRepository.findById(bookingRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fill missing fields like date/time/status
        bookingRequest.setBookingDate(LocalDate.now());
        bookingRequest.setBookingTime(LocalTime.now());
        bookingRequest.setStatus("CONFIRMED");

        return rbookingRepository.save(bookingRequest);
    }
}
