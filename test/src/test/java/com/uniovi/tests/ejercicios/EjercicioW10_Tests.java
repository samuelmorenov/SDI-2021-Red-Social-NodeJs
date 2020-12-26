package com.uniovi.tests.ejercicios;

import static org.junit.Assert.fail;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_Properties;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW10_Tests extends BaseTests {
	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de usuarios. Se
	 * deberá volver al formulario de login.
	 */
	@Test
	public void Prueba_20() {
		driver.navigate().to(URL + "/user/list");
		PO_View.checkKey(driver, "login.login", PO_Properties.getSPANISH());
		PO_View.checkNoKey(driver, "list.intro", PO_Properties.getSPANISH());
	}

	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de invitaciones
	 * de amistad recibida de un usuario estándar. Se deberá volver al formulario de
	 * login.
	 */
	@Test
	public void Prueba_21() {
		driver.navigate().to(URL + "/friend/invitationlist");
		PO_View.checkKey(driver, "login.login", PO_Properties.getSPANISH());
		PO_View.checkNoKey(driver, "invitationlist.title", PO_Properties.getSPANISH());
	}

	/**
	 * Intentar acceder estando autenticado como usuario standard a la lista de
	 * amigos de otro usuario. Se deberá mostrar un mensaje de acción indebida.
	 */
	@Test
	public void Prueba_22() {
		fail("Not yet implemented");
	}
}
