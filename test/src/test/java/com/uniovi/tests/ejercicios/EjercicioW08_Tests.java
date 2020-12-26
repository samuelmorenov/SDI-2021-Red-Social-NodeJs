package com.uniovi.tests.ejercicios;

import org.junit.Test;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_Invitation;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_PrivateView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.util.SeleniumUtils;

public class EjercicioW08_Tests extends BaseTests {
	/**
	 * Sobre el listado de invitaciones recibidas. Hacer click en el botón/enlace de
	 * una de ellas y comprobar que dicha solicitud desaparece del listado de
	 * invitaciones.
	 */
	@Test
	public void Prueba_18() {
		String email = PO_Invitation.enviarPeticionCuentaNueva(driver, 0);
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_PrivateView.accederPagina(driver, "friends-menu", "/friend/invitationlist");
		PO_HomeView.clickId(driver, "acceptButton" + email);
		SeleniumUtils.EsperaCargaPaginaNoTexto(driver, email, PO_View.getTimeout());
	}
}
