package com.uniovi.tests.pageobjects;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.By;

public class PO_HomeView extends PO_NavView {

	static public void clickId(String string) {
		driver.findElement(By.id(string)).click();
	}

	public static void noEsClickable(String string) {
		assertTrue(driver.findElement(By.id(string)).isDisplayed());
	}

}
