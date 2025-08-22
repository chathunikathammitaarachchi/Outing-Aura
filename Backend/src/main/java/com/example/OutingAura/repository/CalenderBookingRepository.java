package com.example.OutingAura.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.OutingAura.model.CalenderBooking;

import java.util.Optional;

public interface CalenderBookingRepository extends MongoRepository<CalenderBooking, String> {
    Optional<CalenderBooking> findByEventAndDateAndTime(String event, String date, String time);
}
