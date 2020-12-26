package com.uniovi.tests.ejercicios;

import static org.junit.Assert.fail;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_Properties;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW02_Tests extends BaseTests {

	/**
	 * Inicio de sesión con datos válidos (usuario estándar).
	 */
	@Test
	public void Prueba_05() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_View.checkKey(driver, "list.intro", PO_Properties.getSPANISH());
	}

	/**
	 * Inicio de sesión con datos inválidos (usuario estándar, campo email y
	 * contraseña vacíos).
	 */
	@Test
	public void Prueba_06() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, "", "");
		PO_View.checkKey(driver, "Error.login", PO_Properties.getSPANISH());
	}

	/**
	 * Inicio de sesión con datos inválidos (usuario estándar, email existente, pero
	 * contraseña incorrecta).
	 */
	@Test
	public void Prueba_07() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, "incorrecta");
		PO_View.checkKey(driver, "Error.login", PO_Properties.getSPANISH());
	}

	/**
	 * Inicio de sesión con datos inválidos (usuario estándar, email no existente y
	 * contraseña no vacía).
	 */
	@Test
	public void Prueba_08() {
		fail("Not yet implemented");
	}

}
