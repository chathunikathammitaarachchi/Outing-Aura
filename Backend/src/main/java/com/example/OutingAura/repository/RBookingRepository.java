package com.example.OutingAura.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.OutingAura.model.RBookings;

public interface RBookingRepository extends MongoRepository<RBookings, String> {



}
