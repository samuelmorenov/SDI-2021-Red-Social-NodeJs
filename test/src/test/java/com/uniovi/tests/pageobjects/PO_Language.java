package com.uniovi.tests.pageobjects;

import org.openqa.selenium.WebDriver;

public class PO_Language {

	private static String ES = "btnSpanish";
	private static String EN = "btnEnglish";
	private static String RU = "btnRussian";

	static public void checkChangeIdiom(WebDriver driver, String message) {
		PO_View.checkKey(driver, message, PO_Properties.getSPANISH());
		PO_HomeView.changeIdiom(driver, RU);
		PO_View.checkKey(driver, message, PO_Properties.getRUSSIAN());
		PO_HomeView.changeIdiom(driver, EN);
		PO_View.checkKey(driver, message, PO_Properties.getENGLISH());
		PO_HomeView.changeIdiom(driver, ES);
		PO_View.checkKey(driver, message, PO_Properties.getSPANISH());
	}

	static public void checkChangeIdiom(WebDriver driver, String message1, String message2) {
		PO_View.checkKey(driver, message1, PO_Properties.getSPANISH());
		PO_View.checkKey(driver, message2, PO_Properties.getSPANISH());
		PO_HomeView.changeIdiom(driver, RU);
		PO_View.checkKey(driver, message1, PO_Properties.getRUSSIAN());
		PO_View.checkKey(driver, message2, PO_Properties.getRUSSIAN());
		PO_HomeView.changeIdiom(driver, EN);
		PO_View.checkKey(driver, message1, PO_Properties.getENGLISH());
		PO_View.checkKey(driver, message2, PO_Properties.getENGLISH());
		PO_HomeView.changeIdiom(driver, ES);
		PO_View.checkKey(driver, message1, PO_Properties.getSPANISH());
		PO_View.checkKey(driver, message2, PO_Properties.getSPANISH());
	}
}
