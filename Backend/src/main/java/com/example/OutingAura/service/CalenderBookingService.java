package com.example.OutingAura.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OutingAura.model.CalenderBooking;
import com.example.OutingAura.repository.CalenderBookingRepository;

import java.util.Optional;

@Service
public class CalenderBookingService {

    @Autowired
    private CalenderBookingRepository calenderbookingRepository;

    public CalenderBooking saveBooking(CalenderBooking calenderbooking) throws Exception {
        Optional<CalenderBooking> existing = calenderbookingRepository.findByEventAndDateAndTime(
                calenderbooking.getEvent(), calenderbooking.getDate(), calenderbooking.getTime()
        );

        if (existing.isPresent()) {
            throw new Exception("This time slot is already booked for the selected event.");
        }

        return calenderbookingRepository.save(calenderbooking);
    }

    
}
