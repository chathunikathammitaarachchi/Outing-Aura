package com.example.OutingAura.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Document(collection = "Hotel_booking")
public class Booking {

     @Id
    private String id;
    
  public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String userEmail;
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    private String selectedEvent;
    public String getSelectedEvent() {
        return selectedEvent;
    }
    public void setSelectedEvent(String selectedEvent) {
        this.selectedEvent = selectedEvent;
    }
    private String selectedDate;
    public String getSelectedDate() {
        return selectedDate;
    }
    public void setSelectedDate(String selectedDate) {
        this.selectedDate = selectedDate;
    }
    private String selectedTime;
    public String getSelectedTime() {
        return selectedTime;
    }
    public void setSelectedTime(String selectedTime) {
        this.selectedTime = selectedTime;
    }
    private String selectedFoodPackage;
    public String getSelectedFoodPackage() {
        return selectedFoodPackage;
    }
    public void setSelectedFoodPackage(String selectedFoodPackage) {
        this.selectedFoodPackage = selectedFoodPackage;
    }
    private double foodPackagePrice;
    public double getFoodPackagePrice() {
        return foodPackagePrice;
    }
    public void setFoodPackagePrice(double foodPackagePrice) {
        this.foodPackagePrice = foodPackagePrice;
    }
    private String selectedDecorationPackage;
    public String getSelectedDecorationPackage() {
        return selectedDecorationPackage;
    }
    public void setSelectedDecorationPackage(String selectedDecorationPackage) {
        this.selectedDecorationPackage = selectedDecorationPackage;
    }
    private double decorationPackagePrice;
    public double getDecorationPackagePrice() {
        return decorationPackagePrice;
    }
    public void setDecorationPackagePrice(double decorationPackagePrice) {
        this.decorationPackagePrice = decorationPackagePrice;
    }
    private int numberOfPeople;
    public int getNumberOfPeople() {
        return numberOfPeople;
    }
    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }
    private double totalPrice;
    public double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
    private LocalDateTime createdAt = LocalDateTime.now();
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
 public String getDate() {
    return selectedDate;
}
public String getTime() {
    return selectedTime;
}



      private String status = "Pending";
      public String getStatus() {
          return status;
      }
      public void setStatus(String status) {
          this.status = status;
      }
     private String rejectionReason;

public String getRejectionReason() {
    return rejectionReason;
}

public void setRejectionReason(String rejectionReason) {
    this.rejectionReason = rejectionReason;
}

public void setGeneratedPassword(String password) {
    
    throw new UnsupportedOperationException("Unimplemented method 'setGeneratedPassword'");
}



}
