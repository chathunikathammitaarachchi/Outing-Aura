package com.example.OutingAura.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.OutingAura.model.Booking;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserEmail(String userEmail);
}
