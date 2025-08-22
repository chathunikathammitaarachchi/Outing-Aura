package com.example.OutingAura.ui;



import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class PackageUITest {

    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // Open the package add form page URL
            driver.get("http://localhost:5173/admin");  // <-- React page for adding package, change accordingly

            // Fill the form fields
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("name"))).sendKeys("Test Package");
            driver.findElement(By.name("description")).sendKeys("This is a test package.");
            driver.findElement(By.name("price")).sendKeys("5000");
            driver.findElement(By.name("category")).sendKeys("decoration");

            // Upload image if input type=file available
            WebElement imageInput = driver.findElement(By.name("image"));
            // Provide the full path to a test image on your machine
            imageInput.sendKeys("src/test/java/com/example/OutingAura/resources/1.jpg");

            // Click submit button - use the correct id or class
            WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit-package-button")));
            submitBtn.click();

            // Wait for response (e.g., success message or redirect)
            Thread.sleep(10000);

            // Optional: Verify if the package was added successfully by checking page content
            String pageSource = driver.getPageSource();
            assert pageSource != null;
            if (pageSource.contains("Test Package") || pageSource.contains("success")) {
                System.out.println("Package added successfully!");
            } else {
                System.out.println("Package add failed!");
            }

            // You can add similar test logic for update/delete by navigating to those pages
            // and filling fields/selecting the package, then clicking update/delete buttons.

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}

