package com.uniovi.tests.pageobjects;

import com.uniovi.tests.data.UserList;

public class PO_Invitation extends PO_NavView {

	public static void enviarPeticion(int user1, int user2) {
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(UserList.usuarios(user1).email, UserList.usuarios(user1).password);
		PO_HomeView.clickId("sendButton-" + UserList.usuarios(user2).email);
		PO_HomeView.clickOption("logout", "class", "btn btn-primary");
	}

	public static String enviarPeticionCuentaNueva(int user) {
		String name = Integer.toString((int) (1000000 * Math.random()));
		String email = name + "@email.com";
		String password = UserList.usuariosTest(0).password;
		PO_HomeView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm(email, name, "Test_Invitation", password, password);
		PO_LoginView.fillForm(email, password);
		PO_HomeView.clickId("sendButton-" + UserList.usuarios(user).email);
		PO_HomeView.clickOption("logout", "class", "btn btn-primary");
		return email;
	}
}
