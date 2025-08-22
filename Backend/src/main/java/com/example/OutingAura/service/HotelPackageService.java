package com.example.OutingAura.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OutingAura.model.HotelPackage;
import com.example.OutingAura.repository.HotelPackageRepository;

import java.util.List;

@Service
public class HotelPackageService {

    @Autowired
    private HotelPackageRepository hotelPackageRepository;

    public List<HotelPackage> getAllPackages() {
        return hotelPackageRepository.findAll();
    }

    public HotelPackage addPackage(HotelPackage hotelPackage) {
        return hotelPackageRepository.save(hotelPackage);
    }
}
