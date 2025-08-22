package com.example.OutingAura.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class CalenderBooking {

    @Id
    private String id;

    private String event;
    private String date;
    private String time;

    public CalenderBooking() {
    }

    public CalenderBooking(String event, String date, String time) {
        this.event = event;
        this.date = date;
        this.time = time;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getEvent() {
        return event;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
