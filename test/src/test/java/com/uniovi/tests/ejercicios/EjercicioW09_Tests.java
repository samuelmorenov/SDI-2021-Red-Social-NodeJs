package com.uniovi.tests.ejercicios;

import org.junit.Test;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_Invitation;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_PrivateView;
import com.uniovi.tests.pageobjects.PO_View;

public class EjercicioW09_Tests extends BaseTests {
	/**
	 * Mostrar el listado de amigos de un usuario. Comprobar que el listado contiene
	 * los amigos que deben ser.
	 */
	@Test
	public void Prueba_19() {
		String email1 = PO_Invitation.enviarPeticionCuentaNueva(driver, 3);
		String email2 = PO_Invitation.enviarPeticionCuentaNueva(driver, 3);
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(3).email, UserList.usuarios(3).password);
		PO_PrivateView.accederPagina(driver, "friends-menu", "/friend/invitationlist");
		PO_HomeView.clickId(driver, "acceptButton" + email1);
		PO_HomeView.clickId(driver, "acceptButton" + email2);
		PO_PrivateView.accederPagina(driver, "friends-menu", "/friend/friendlist");
		PO_View.checkElement(driver, "text", email1);
		PO_View.checkElement(driver, "text", email2);
	}
}
