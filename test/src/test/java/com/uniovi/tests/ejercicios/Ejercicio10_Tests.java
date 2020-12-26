package com.uniovi.tests.ejercicios;

import org.junit.Test;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_Language;
import com.uniovi.tests.pageobjects.PO_LoginView;

public class Ejercicio10_Tests extends BaseTests {

	/**
	 * Visualizar al menos cuatro páginas en Español/Inglés/Español (comprobando que
	 * algunas de las etiquetas cambian al idioma correspondiente). Ejemplo, Página
	 * principal/Opciones Principales de Usuario/Listado de Usuarios.
	 */
	@Test
	public void Prueba_20() {
		//HOME
		PO_Language.checkChangeIdiom(driver, "login.message");
		//Signup
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
		PO_Language.checkChangeIdiom(driver, "signup.pass2", "signup.message");
		//Login
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_Language.checkChangeIdiom(driver, "login.login", "login.message");
		//Usuarios
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_Language.checkChangeIdiom(driver, "list.title", "list.intro");
	}
}
