package com.uniovi.tests.ejercicios;

import org.junit.Test;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_Invitation;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_PrivateView;
import com.uniovi.tests.pageobjects.PO_View;

public class EjercicioW07_Tests extends BaseTests {

	/**
	 * Mostrar el listado de invitaciones de amistad recibidas. Comprobar con un
	 * listado que contenga varias invitaciones recibidas.
	 */
	@Test
	public void Prueba_17() {
		PO_Invitation.enviarPeticion(0, 2);
		PO_Invitation.enviarPeticion(1, 2);
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(UserList.usuarios(2).email, UserList.usuarios(2).password);
		PO_PrivateView.accederPagina("friends-menu", "/invitations");
		PO_View.checkElement("text", UserList.usuarios(0).name);
		PO_View.checkElement("text", UserList.usuarios(1).name);
	}
}
