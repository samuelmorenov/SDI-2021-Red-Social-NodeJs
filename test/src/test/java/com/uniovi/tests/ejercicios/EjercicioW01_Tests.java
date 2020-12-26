package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_Properties;
import com.uniovi.tests.pageobjects.PO_RegisterView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW01_Tests extends BaseTests {
	
	private static String randomEmail() {
		return "correo" + Integer.toString((int) (100000 * Math.random())) + "@email.es";
	}

	/** Registro de Usuario con datos válidos. */
	@Test
	public void Prueba_01() {
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm(driver, randomEmail(), UserList.usuariosTest(0).name,
				UserList.usuariosTest(0).lastName, UserList.usuariosTest(0).password,
				UserList.usuariosTest(0).password);
		PO_View.checkKey(driver, "list.intro", PO_Properties.getSPANISH());
	}

//	/** Registro de Usuario con datos inválidos: email vacío */
//	@Test
//	public void Prueba_02_a() {
//		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
//		PO_RegisterView.fillForm(driver, "", UserList.usuariosTest(0).name, UserList.usuariosTest(0).lastName,
//				UserList.usuariosTest(0).password, UserList.usuariosTest(0).password);
//		PO_View.checkKey(driver, "Error.empty", PO_Properties.getSPANISH());
//	}
//
//	/** Registro de Usuario con datos inválidos: nombre vacío */
//	@Test
//	public void Prueba_02_b() {
//		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
//		PO_RegisterView.fillForm(driver, randomEmail(), "", UserList.usuariosTest(0).lastName,
//				UserList.usuariosTest(0).password, UserList.usuariosTest(0).password);
//		PO_View.checkKey(driver, "Error.signup.name.length", PO_Properties.getSPANISH());
//	}
//
//	/** Registro de Usuario con datos inválidos: apellidos vacío */
//	@Test
//	public void Prueba_02_c() {
//		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
//		PO_RegisterView.fillForm(driver, randomEmail(), UserList.usuariosTest(0).name, "",
//				UserList.usuariosTest(0).password, UserList.usuariosTest(0).password);
//		PO_View.checkKey(driver, "Error.signup.lastName.length", PO_Properties.getSPANISH());
//	}
//
//	/**
//	 * Registro de Usuario con datos inválidos: repetición de contraseña inválida
//	 */
//	@Test
//	public void Prueba_03() {
//		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
//		PO_RegisterView.fillForm(driver, randomEmail(), UserList.usuariosTest(0).name,
//				UserList.usuariosTest(0).lastName, UserList.usuariosTest(0).password,
//				UserList.usuariosTest(0).password + "e");
//		PO_View.checkKey(driver, "Error.signup.passwordConfirm.coincidence", PO_Properties.getSPANISH());
//
//	}
//
//	/** Registro de Usuario con datos inválidos: email existente */
//	@Test
//	public void Prueba_04() {
//		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
//		PO_RegisterView.fillForm(driver, UserList.usuarios(0).email, UserList.usuariosTest(0).name,
//				UserList.usuariosTest(0).lastName, UserList.usuariosTest(0).password,
//				UserList.usuariosTest(0).password + "e");
//		PO_View.checkKey(driver, "Error.signup.email.duplicate", PO_Properties.getSPANISH());
//	}
}
