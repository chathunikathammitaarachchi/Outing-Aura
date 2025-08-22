package com.example.OutingAura.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CalenderBookingUITest {

    public static void main(String[] args) {
        // Setup ChromeDriver automatically
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Setup explicit wait
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // Open the booking form page URL
            driver.get("http://localhost:5173/bookingform");

            // Wait for the 'event' input field to be visible and type event name
            WebElement eventInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("event")));
            eventInput.clear();
            eventInput.sendKeys("Test Event");

            // Find and fill the 'date' input (format: yyyy-MM-dd)
            WebElement dateInput = driver.findElement(By.name("date"));
            dateInput.clear();
            dateInput.sendKeys("2025-06-01");

            // Find and fill the 'time' input (format: HH:mm)
            WebElement timeInput = driver.findElement(By.name("time"));
            timeInput.clear();
            timeInput.sendKeys("14:00");

            // Wait for the submit button to be clickable and click it
            WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit-booking-button")));
            submitBtn.click();

            // Wait for the success message to be visible after submission
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success-message")));

            // Verify page source or success message presence
            String pageSource = driver.getPageSource();
            assert pageSource != null;
            if (pageSource.contains("Booking successful") || pageSource.contains("success")) {
                System.out.println("Booking created successfully!");
            } else {
                System.out.println("Booking creation failed!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close the browser
            driver.quit();
        }
    }
}
