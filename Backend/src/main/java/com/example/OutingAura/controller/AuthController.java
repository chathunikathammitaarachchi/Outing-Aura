package com.example.OutingAura.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.OutingAura.model.User;
import com.example.OutingAura.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // frontend port
public class AuthController {

    @Autowired
    private UserRepository userRepository;

   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> userMap) {
    String email = userMap.get("email");
    String password = userMap.get("password");

    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isPresent()) {
        User user = userOpt.get();
        if (user.getPassword().equals(password)) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }
}

}
