package com.example.OutingAura.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.OutingAura.model.RPackage;

import java.util.List;



public interface RPackageRepository extends MongoRepository<RPackage, String> {
    List<RPackage> findByUserEmail(String userEmail);
    List<RPackage> findByCategory(String category);


}
