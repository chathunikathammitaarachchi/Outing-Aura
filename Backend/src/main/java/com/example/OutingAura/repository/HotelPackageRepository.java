package com.example.OutingAura.repository;

import com.example.OutingAura.model.HotelPackage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelPackageRepository extends MongoRepository<HotelPackage, String> {
}
