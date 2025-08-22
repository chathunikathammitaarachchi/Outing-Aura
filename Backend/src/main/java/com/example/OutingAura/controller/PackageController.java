package com.example.OutingAura.controller;

import com.example.OutingAura.model.HotelPackage;
import com.example.OutingAura.repository.HotelPackageRepository;
import com.example.OutingAura.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/package")
@CrossOrigin(origins = "http://localhost:5173")
public class PackageController {

    @Autowired
    private HotelPackageRepository hotelPackageRepository;

    @Autowired
    private ImageService imageService;

    // Add Package
    @PostMapping
    public ResponseEntity<?> addPackage(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        try {
            HotelPackage newPackage = new HotelPackage();
            newPackage.setName(name);
            newPackage.setDescription(description);
            newPackage.setPrice(price);
            newPackage.setCategory(category);

            if (file != null && !file.isEmpty()) {
                String imageUrl = imageService.uploadImage(file); // Use service
                newPackage.setImageUrl(imageUrl);
            }

            HotelPackage savedPackage = hotelPackageRepository.save(newPackage);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPackage);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the package: " + e.getMessage());
        }
    }

    // Get All Packages
    @GetMapping
    public List<HotelPackage> getAllPackages() {
        return hotelPackageRepository.findAll();
    }

    // Update Package
    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePackage(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        return hotelPackageRepository.findById(id)
                .map(existingPackage -> {
                    existingPackage.setName(name);
                    existingPackage.setDescription(description);
                    existingPackage.setPrice(price);
                    existingPackage.setCategory(category);

                    if (file != null && !file.isEmpty()) {
                        try {
                            String imageUrl = imageService.uploadImage(file);
                            existingPackage.setImageUrl(imageUrl);
                        } catch (Exception e) {
                            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                    .body("Error uploading image: " + e.getMessage());
                        }
                    }

                    hotelPackageRepository.save(existingPackage);
                    return ResponseEntity.ok(existingPackage);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete Package
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable String id) {
        if (hotelPackageRepository.existsById(id)) {
            hotelPackageRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
