package com.example.OutingAura.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.OutingAura.model.RUser;

import java.util.Optional;

public interface RUserRepository extends MongoRepository<RUser, String> {

    // Check if a user exists by email
    boolean existsByEmail(String email);

    // Find a user by email
    RUser findByEmail(String email);

    // Find a user by reset password token
    RUser findByResetPasswordToken(String resetPasswordToken);  // Method to find a user by reset password token

    // Find a user by email and reset password token
    Optional<RUser> findByEmailAndResetPasswordToken(String email, String resetPasswordToken);

    // Optional: Find a user by email and password (if needed for login authentication)
    Optional<RUser> findByEmailAndPassword(String email, String password);  // Method to find a user by email and password (if needed)

}
