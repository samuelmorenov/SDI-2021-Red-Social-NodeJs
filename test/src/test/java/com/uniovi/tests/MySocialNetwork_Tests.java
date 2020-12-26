package com.uniovi.tests;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.ejercicios.*;

@RunWith(Suite.class)
@SuiteClasses({ 
	EjercicioW01_Tests.class
})
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MySocialNetwork_Tests {

	// Antes de la primera prueba
	@BeforeClass
	static public void begin() {
		DriverSingleton.setDriver();
	}

	// Al finalizar la última prueba
	@AfterClass
	static public void end() {
		// Cerramos el navegador al finalizar las pruebas
		DriverSingleton.getDriver().quit();
	}

}
