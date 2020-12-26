package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_Search;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.util.SeleniumUtils;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio05_Tests extends BaseTests {

	/**
	 * Hacer una búsqueda con el campo vacío y comprobar que se muestra la página
	 * que corresponde con el listado usuarios existentes en el sistema.
	 */
	@Test
	public void Prueba_12() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_Search.search(driver, "");
		PO_View.checkElement(driver, "text", UserList.usuarios(1).email);
		PO_View.checkElement(driver, "text", UserList.usuarios(2).email);
		PO_View.checkElement(driver, "text", UserList.usuarios(3).email);
		PO_View.checkElement(driver, "text", UserList.usuarios(4).email);
	}

	/**
	 * Hacer una búsqueda escribiendo en el campo un texto que no exista y comprobar
	 * que se muestra la página que corresponde, con la lista de usuarios vacía.
	 */
	@Test
	public void Prueba_13() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_Search.search(driver, "textoInexistente");
		SeleniumUtils.EsperaCargaPaginaNoTexto(driver, "@email", PO_View.getTimeout());
	}

	/**
	 * Hacer una búsqueda con un texto específico y comprobar que se muestra la
	 * página que corresponde, con la lista de usuarios en los que el texto
	 * especificados sea parte de su nombre, apellidos o de su email.
	 */
	@Test
	public void Prueba_14() {
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_Search.search(driver, "ma");
		PO_View.checkElement(driver, "text", "maria@email.com");
		PO_View.checkElement(driver, "text", "marta@email.com");
		//En este test estan puestos los email directamente, si no funciona comprobar la base de datos
	}
}
