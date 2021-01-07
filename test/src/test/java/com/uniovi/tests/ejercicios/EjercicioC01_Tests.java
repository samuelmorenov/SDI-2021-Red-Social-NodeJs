package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC01_Tests extends BaseTestsApi {

	/**
	 * Inicio de sesión con datos válidos.
	 */
	@Test
	public void Prueba_23() {
		PO_LoginView.fillForm(UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_View.checkElement("text", "Los usuarios que actualmente figuran en el sistema son los siguientes:");

	}

	/**
	 * Inicio de sesión con datos inválidos (usuario no existente en la aplicación).
	 */
	@Test
	public void Prueba_24() {		
		PO_LoginView.fillForm("email_inexistente@error.com", UserList.usuarios(0).password);
		PO_View.checkElement("text", "La combinacion usuario-contraseña es incorrecta.");
	}

}
