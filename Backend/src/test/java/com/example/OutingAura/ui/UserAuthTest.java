package com.example.OutingAura.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class UserAuthTest {

    public static void main(String[] args) {
        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Setup explicit wait
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // Go to signup page
            driver.get("http://localhost:5173/rsignup");

            // Wait for signup form fields and fill them
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("name"))).sendKeys("Test User");
            driver.findElement(By.name("email")).sendKeys("testuser@example.com");
            driver.findElement(By.name("password")).sendKeys("test1234");
            driver.findElement(By.name("confirmPassword")).sendKeys("test1234");

            // If category is present (optional)
            try {
                WebElement category = driver.findElement(By.name("category"));
                category.sendKeys("customer");
            } catch (Exception e) {
                // Ignore if category field not found
            }

            // Wait for and click the signup button
            WebElement signUpButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("signup-button")));
            signUpButton.click();

            // Wait some time for signup process (or wait for a success message)
            Thread.sleep(3000);

            // Go to login page
            driver.get("http://localhost:5173/rlogin");

            // Wait for login form fields and fill them
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("email"))).sendKeys("testuser@example.com");
            driver.findElement(By.name("password")).sendKeys("test1234");

            // Wait for and click login button
            WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("login-button")));
            loginButton.click();

            // Wait for login to complete and page to load
            Thread.sleep(3000);

            // Check if login successful by checking page content
            String pageSource = driver.getPageSource();
            assert pageSource != null;
            if (pageSource.contains("Welcome") || pageSource.contains("Dashboard")) {
                System.out.println("Login successful!");
            } else {
                System.out.println("Login failed!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit(); // Close browser
        }
    }
}
