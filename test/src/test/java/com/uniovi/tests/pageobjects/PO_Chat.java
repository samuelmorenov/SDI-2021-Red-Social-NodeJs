package com.uniovi.tests.pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class PO_Chat extends PO_NavView{
	
	static public void sendMessage(String text) {

		WebElement email = driver.findElement(By.id("input-chat"));
		email.click();
		email.clear();
		email.sendKeys(text);

		By boton = By.id("button-chat");
		driver.findElement(boton).click();

	}

}
