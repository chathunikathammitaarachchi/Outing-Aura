package com.example.OutingAura.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 

public class ImageController {

    private final String imageDirectory = "uploads/images/";

    @GetMapping("/images/{imageName}")
public Resource getImage(@PathVariable String imageName) throws Exception {
    try {
        
        Path imagePath = Paths.get(imageDirectory + imageName);
        Resource resource = new UrlResource(imagePath.toUri());
        
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new Exception("Image not found or not readable: " + imageName);
        }
    } catch (Exception e) {
        throw new Exception("Error loading image: " + imageName, e);
    }
}

}
