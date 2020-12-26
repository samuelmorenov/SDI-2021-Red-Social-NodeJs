package com.uniovi.tests.ejercicios;

import org.junit.Test;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_View;

public class EjercicioW04_Tests extends BaseTests {
	/**
	 * Mostrar el listado de usuarios y comprobar que se muestran todos los que
	 * existen en el sistema.
	 */
	@Test
	public void Prueba_11() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_View.checkElement(driver, "text", UserList.usuarios(1).email);
		PO_View.checkElement(driver, "text", UserList.usuarios(2).email);
		PO_View.checkElement(driver, "text", UserList.usuarios(3).email);
		PO_View.checkElement(driver, "text", UserList.usuarios(4).email);
	}
}
