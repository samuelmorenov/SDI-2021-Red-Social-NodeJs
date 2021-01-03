package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW02_Tests extends BaseTests {

	/**
	 * Inicio de sesión con datos válidos (usuario estándar).
	 */
	@Test
	public void Prueba_05() {
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_View.checkElement("text", "Los usuarios que actualmente figuran en el sistema son los siguientes:");
	}

	/**
	 * Inicio de sesión con datos inválidos (usuario estándar, campo email y
	 * contraseña vacíos).
	 */
	@Test
	public void Prueba_06() {
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm("", "");
		PO_View.checkNoElement("Los usuarios que actualmente figuran en el sistema son los siguientes:");
	}

	/**
	 * Inicio de sesión con datos inválidos (usuario estándar, email existente, pero
	 * contraseña incorrecta).
	 */
	@Test
	public void Prueba_07() {
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(UserList.usuarios(0).email, "incorrecta");
		PO_View.checkElement("text", "La combinacion usuario-contraseña es incorrecta.");
	}

	/**
	 * Inicio de sesión con datos inválidos (usuario estándar, email no existente y
	 * contraseña no vacía).
	 */
	@Test
	public void Prueba_08() {
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm("email_inexistente@error.com", "incorrecta");
		PO_View.checkElement("text", "La combinacion usuario-contraseña es incorrecta.");
	}

}
