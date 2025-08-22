

package com.example.OutingAura.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.OutingAura.model.RPackage;
import com.example.OutingAura.repository.RPackageRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

@RequestMapping("/api/packages")
public class RPackageController {

    @Autowired
    private RPackageRepository rpackageRepo;

    // Save package for current user
    @PostMapping("/add")
    public ResponseEntity<?> addPackage(@RequestBody RPackage newPackage) {
        RPackage saved = rpackageRepo.save(newPackage);
        return ResponseEntity.ok(saved);
    }

    // Get current user's packages
    @GetMapping("/my/{email}")
    public ResponseEntity<List<RPackage>> getUserPackages(@PathVariable String email) {
        List<RPackage> packages = rpackageRepo.findByUserEmail(email);
        return ResponseEntity.ok(packages);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePackage(@PathVariable String id) {
        if (rpackageRepo.existsById(id)) {
            rpackageRepo.deleteById(id);
            return ResponseEntity.ok().body("Package deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updatePackage(@PathVariable String id, @RequestBody RPackage updatedPackage) {
        Optional<RPackage> optionalPackage = rpackageRepo.findById(id);
        if (optionalPackage.isPresent()) {
            RPackage existingPackage = optionalPackage.get();
            existingPackage.setPackageName(updatedPackage.getPackageName());
            existingPackage.setDescription(updatedPackage.getDescription());
            existingPackage.setPrice(updatedPackage.getPrice());
            existingPackage.setCategory(updatedPackage.getCategory());
            existingPackage.setImageUrls(updatedPackage.getImageUrls());

            RPackage saved = rpackageRepo.save(existingPackage);
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // PackageController.java

    @GetMapping("/category/{category}")
    public ResponseEntity<List<RPackage>> getPackagesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(rpackageRepo.findByCategory(category));
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException, IOException {
        Path imagePath = Paths.get("uploads/" + imageName);
        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageBytes = Files.readAllBytes(imagePath);
        return ResponseEntity.ok().body(imageBytes);
    }


}


