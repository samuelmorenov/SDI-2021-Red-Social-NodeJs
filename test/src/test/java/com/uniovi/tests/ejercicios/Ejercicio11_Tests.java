package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_Properties;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.util.SeleniumUtils;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio11_Tests extends BaseTests {
	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de usuarios. Se
	 * deberá volver al formulario de login.
	 */
	@Test
	public void Prueba_21() {
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
	public void Prueba_22() {
		driver.navigate().to(URL + "/friend/invitationlist");
		PO_View.checkKey(driver, "login.login", PO_Properties.getSPANISH());
		PO_View.checkNoKey(driver, "invitationlist.title", PO_Properties.getSPANISH());
	}

	/**
	 * Estando autenticado como usuario estándar intentar acceder a una opción
	 * disponible solo para usuarios administradores (Se puede añadir una opción
	 * cualquiera en el menú). Se deberá indicar un mensaje de acción prohibida.
	 */
	@Test
	public void Prueba_23() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		driver.navigate().to(URL + "/user/add");
		SeleniumUtils.textoPresentePagina(driver, "HTTP Status 403 – Forbidden");
		//TODO: Check forbidden.message
		//PO_View.checkKey(driver, "forbidden.message", PO_Properties.getSPANISH());
		PO_View.checkNoKey(driver, "add.title", PO_Properties.getSPANISH());
	}
}
