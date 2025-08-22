package com.example.OutingAura.controller;

import com.example.OutingAura.model.RPackage;
import com.example.OutingAura.repository.RPackageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RPackageController.class)
public class RPackageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RPackageRepository rpackageRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testAddPackage() throws Exception {
        RPackage pkg = new RPackage();
        pkg.setPackageName("Test Package");
        pkg.setCategory("Food");
        pkg.setDescription("Test description");
        pkg.setPrice(1000.0);
        pkg.setUserEmail("test@example.com");

        when(rpackageRepo.save(any(RPackage.class))).thenReturn(pkg);

        mockMvc.perform(post("/api/packages/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pkg)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.packageName").value("Test Package"));
    }

    @Test
    public void testGetUserPackages() throws Exception {
        RPackage pkg = new RPackage();
        pkg.setUserEmail("user@example.com");
        pkg.setPackageName("Birthday Special");

        when(rpackageRepo.findByUserEmail("user@example.com")).thenReturn(Arrays.asList(pkg));

        mockMvc.perform(get("/api/packages/my/user@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].packageName").value("Birthday Special"));
    }

    @Test
    public void testDeletePackageSuccess() throws Exception {
        when(rpackageRepo.existsById("123")).thenReturn(true);
        mockMvc.perform(delete("/api/packages/delete/123"))
                .andExpect(status().isOk())
                .andExpect(content().string("Package deleted successfully."));
    }

    @Test
    public void testDeletePackageNotFound() throws Exception {
        when(rpackageRepo.existsById("404")).thenReturn(false);
        mockMvc.perform(delete("/api/packages/delete/404"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdatePackageSuccess() throws Exception {
        RPackage existing = new RPackage();
        existing.setId("1");
        existing.setPackageName("Old Name");

        RPackage updated = new RPackage();
        updated.setPackageName("New Name");
        updated.setDescription("Updated Description");
        updated.setPrice(1500.0);
        updated.setCategory("Decoration");

        when(rpackageRepo.findById("1")).thenReturn(Optional.of(existing));
        when(rpackageRepo.save(any(RPackage.class))).thenReturn(updated);

        mockMvc.perform(put("/api/packages/edit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.packageName").value("New Name"));
    }

    @Test
    public void testUpdatePackageNotFound() throws Exception {
        RPackage updated = new RPackage();
        updated.setPackageName("Not Found");

        when(rpackageRepo.findById("999")).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/packages/edit/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetPackagesByCategory() throws Exception {
        RPackage pkg = new RPackage();
        pkg.setCategory("Food");
        pkg.setPackageName("Food Fest");

        when(rpackageRepo.findByCategory("Food")).thenReturn(Arrays.asList(pkg));

        mockMvc.perform(get("/api/packages/category/Food"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].packageName").value("Food Fest"));
    }
}
