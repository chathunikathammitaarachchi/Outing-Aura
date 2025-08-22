package com.example.OutingAura.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recousers")
public class User {
    @Id
    private String id;
    private String email;
    private String password;

    public String getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }

    public void setId(String id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
}

