package com.example.OutingAura.controller;

import com.example.OutingAura.model.HotelPackage;
import com.example.OutingAura.repository.HotelPackageRepository;
import com.example.OutingAura.service.ImageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PackageController.class)
class PackageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HotelPackageRepository hotelPackageRepository;

    @MockBean
    private ImageService imageService;

    @Test
    void testAddPackageWithImage() throws Exception {
        // Given
        MockMultipartFile imageFile = new MockMultipartFile(
                "image", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "dummy image".getBytes()
        );

        when(imageService.uploadImage(any())).thenReturn("/images/test.jpg");

        HotelPackage savedPackage = new HotelPackage();
        savedPackage.setId("123");
        savedPackage.setName("Birthday Package");
        savedPackage.setDescription("Includes cake and decoration");
        savedPackage.setPrice(5000.0);
        savedPackage.setCategory("Decoration");
        savedPackage.setImageUrl("/images/test.jpg");

        when(hotelPackageRepository.save(any(HotelPackage.class))).thenReturn(savedPackage);

        // When & Then
        mockMvc.perform(multipart("/api/package")
                        .file(imageFile)
                        .param("name", "Birthday Package")
                        .param("description", "Includes cake and decoration")
                        .param("price", "5000.0")
                        .param("category", "Decoration")
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Birthday Package"))
                .andExpect(jsonPath("$.imageUrl").value("/images/test.jpg"));
    }
}
