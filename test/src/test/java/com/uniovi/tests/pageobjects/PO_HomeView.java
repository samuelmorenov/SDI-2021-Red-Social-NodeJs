package com.uniovi.tests.pageobjects;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class PO_HomeView extends PO_NavView {

	static public void clickId(WebDriver driver, String string) {
		driver.findElement(By.id(string)).click();
	}

	public static void noEsClickable(WebDriver driver, String string) {
		assertTrue(driver.findElement(By.id(string)).isDisplayed());
	}

}
