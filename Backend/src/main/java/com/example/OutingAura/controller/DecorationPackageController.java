package com.example.OutingAura.controller;

import com.example.OutingAura.model.DecorationPackage;
import com.example.OutingAura.repository.DecorationPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/decopackages")
@CrossOrigin(origins = "http://localhost:5173")
public class DecorationPackageController {

    @Autowired
    private DecorationPackageRepository decorationPackageRepository;

   
@PostMapping
public ResponseEntity<?> addPackage(
    @RequestParam("name") String name,
    @RequestParam("description") String description,
    @RequestParam("price") double price,
    @RequestParam("category") String category,
    @RequestParam(value = "image", required = false) MultipartFile file) {

  try {
    DecorationPackage newPackage = new DecorationPackage();
    newPackage.setName(name);
    newPackage.setDescription(description);
    newPackage.setPrice(price);
    newPackage.setCategory(category);

    if (file != null && !file.isEmpty()) {
      String imageUrl = uploadImage(file);
      newPackage.setImageUrl(imageUrl);  
    }

    DecorationPackage savedPackage = decorationPackageRepository.save(newPackage);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedPackage);

  } catch (Exception e) {
    
    e.printStackTrace();
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                         .body("An error occurred while saving the package: " + e.getMessage());
  }
}


private String uploadImage(MultipartFile file) throws Exception {
    try {
        
        Path uploadsDirectory = Paths.get("uploads", "images");

        
        Files.createDirectories(uploadsDirectory);

       
        Path filePath = uploadsDirectory.resolve(file.getOriginalFilename());

        
        Files.copy(file.getInputStream(), filePath);

       
        return "/images/" + file.getOriginalFilename(); 
    } catch (IOException e) {
        
        throw new Exception("Error uploading image: " + e.getMessage());
    }
}


    
    
    

  
    @GetMapping
    public List<DecorationPackage> getAllPackages() {
        return decorationPackageRepository.findAll();
    }

    @PatchMapping("/{id}")
public ResponseEntity<?> updatePackage(
    @PathVariable String id,
    @RequestParam("name") String name,
    @RequestParam("description") String description,
    @RequestParam("price") double price,
    @RequestParam("category") String category,
    @RequestParam(value = "image", required = false) MultipartFile file) {

    try {
        return decorationPackageRepository.findById(id)
                .map(existingPackage -> {
                    existingPackage.setName(name);
                    existingPackage.setDescription(description);
                    existingPackage.setPrice(price);
                    existingPackage.setCategory(category);

                    
                    if (file != null && !file.isEmpty()) {
                        try {
                            String imageUrl = uploadImage(file);
                            existingPackage.setImageUrl(imageUrl); 
                        } catch (Exception e) {
                            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                    .body("Error uploading image: " + e.getMessage());
                        }
                    }

                    decorationPackageRepository.save(existingPackage);
                    return ResponseEntity.ok(existingPackage);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while updating the package: " + e.getMessage());
    }
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable String id) {
        if (decorationPackageRepository.existsById(id)) {
            decorationPackageRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
