package com.example.OutingAura.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.OutingAura.model.Booking;
import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    private void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public void sendConfirmationNotification(Booking booking, String generatedPassword) {
        String emailBody = String.format(
            "Dear Customer,\n\nYour booking for '%s' has been confirmed!\n" +
            "Booking ID: %s\nAuto-generated password: %s\n" +
            "Login to your account here: www.daytripper.com/login\n\n" +
            "Thank you for choosing DayTripper!",
            booking.getSelectedEvent(), booking.getId(), generatedPassword
        );

        sendEmail(booking.getUserEmail(), "Booking Confirmation", emailBody);

        String smsBody = String.format(
            "Your booking for '%s' has been confirmed! Booking ID: %s. Password: %s.",
            booking.getSelectedEvent(), booking.getId(), generatedPassword
        );

        
    }

    public void sendRejectionNotification(Booking booking, String rejectionReason) {
        String emailBody = String.format(
            "Dear Customer,\n\nWe regret to inform you that your booking for '%s' has been rejected.\n" +
            "Reason: %s\nBooking ID: %s\n\nThank you for considering DayTripper.",
            booking.getSelectedEvent(), rejectionReason, booking.getId()
        );

        sendEmail(booking.getUserEmail(), "Booking Rejection", emailBody);

        String smsBody = String.format(
            "Your booking for '%s' was rejected. Reason: %s. Booking ID: %s.",
            booking.getSelectedEvent(), rejectionReason, booking.getId()
        );

    }

    private void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
        }
    }

 
}
