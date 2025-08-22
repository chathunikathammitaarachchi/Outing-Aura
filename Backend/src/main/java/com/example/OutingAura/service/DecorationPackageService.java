package com.example.OutingAura.service;

import com.example.OutingAura.model.DecorationPackage;
import com.example.OutingAura.repository.DecorationPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DecorationPackageService {

    @Autowired
    private DecorationPackageRepository decorationPackageRepository;

    public List<DecorationPackage> getAllPackages() {
        return decorationPackageRepository.findAll();
    }

    public DecorationPackage addPackage(DecorationPackage decorationPackage) {
        return decorationPackageRepository.save(decorationPackage);
    }
}
