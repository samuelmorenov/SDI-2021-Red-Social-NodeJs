package com.uniovi.tests.ejercicios;

import org.junit.After;
import org.junit.Before;

import com.uniovi.tests.DriverSingleton;

public class BaseTests {

	protected static String URL = "https://localhost:8081";
	
	protected static String randomEmail() {
		return "correo" + Integer.toString((int) (100000 * Math.random())) + "@email.es";
	}

	// Antes de cada prueba se navega al URL home de la aplicaciónn
	@Before
	public void setUp() {
		DriverSingleton.getDriver().navigate().to(URL);
	}

	// Después de cada prueba se borran las cookies del navegador
	@After
	public void tearDown() {
		DriverSingleton.getDriver().manage().deleteAllCookies();

	}
}
