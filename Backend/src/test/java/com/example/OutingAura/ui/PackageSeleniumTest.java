package com.example.OutingAura.ui;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class PackageSeleniumTest {

    public static void main(String[] args) {
        // Setup ChromeDriver path (make sure you have chromedriver in your PATH or specify location)
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();



        try {
            // Open the frontend URL
            driver.get("http://localhost:5173/add-package");

            // Example: Click a button or link to add a package (update selectors based on your frontend)
            WebElement addPackageButton = driver.findElement(By.id("add-package-btn"));
            addPackageButton.click();

            // Fill form fields (update ids/names to match your frontend)
            WebElement packageNameInput = driver.findElement(By.id("packageName"));
            packageNameInput.sendKeys("Test Package");

            WebElement descriptionInput = driver.findElement(By.id("description"));
            descriptionInput.sendKeys("This is a test package description");

            WebElement priceInput = driver.findElement(By.id("price"));
            priceInput.sendKeys("123.45");

            // Submit the form
            WebElement submitBtn = driver.findElement(By.id("submit-btn"));
            submitBtn.click();

            // You can add assertions here, e.g. check for success message
            WebElement successMessage = driver.findElement(By.id("success-msg"));
            if(successMessage.isDisplayed()) {
                System.out.println("Package added successfully!");
            }

            Thread.sleep(10000);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
