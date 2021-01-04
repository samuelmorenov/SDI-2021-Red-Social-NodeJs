package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.DriverSingleton;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW10_Tests extends BaseTests {
	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de usuarios. Se
	 * deberá volver al formulario de login.
	 */
	@Test
	public void Prueba_20() {
		DriverSingleton.getDriver().navigate().to(URL + "/users");
		PO_View.checkElement("text", "Identificación de usuario");
	}

	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de invitaciones
	 * de amistad recibida de un usuario estándar. Se deberá volver al formulario de
	 * login.
	 */
	@Test
	public void Prueba_21() {
		DriverSingleton.getDriver().navigate().to(URL + "/users");
		PO_View.checkElement("text", "Identificación de usuario");
	}

	/**
	 * Intentar acceder estando autenticado como usuario standard a la lista de
	 * amigos de otro usuario. Se deberá mostrar un mensaje de acción indebida.
	 */
	@Test
	public void Prueba_22() {
		DriverSingleton.getDriver().navigate().to(URL + "/invitations");
		PO_View.checkElement("text", "Identificación de usuario");
	}
}
