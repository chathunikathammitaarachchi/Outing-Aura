package com.example.OutingAura.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "offers")
public class Offer {
    @Id
    private String id;
    private String title;
    private String description;

    // Getters and Setters
}
