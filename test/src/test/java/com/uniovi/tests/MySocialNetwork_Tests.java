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
	Ejercicio01_Tests.class, 
	Ejercicio02_Tests.class, 
	Ejercicio03_Tests.class, 
	Ejercicio04_Tests.class,
	Ejercicio05_Tests.class, 
	Ejercicio06_Tests.class, 
	Ejercicio07_Tests.class, 
	Ejercicio08_Tests.class,
	Ejercicio09_Tests.class, 
	Ejercicio10_Tests.class, 
	Ejercicio11_Tests.class 
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
