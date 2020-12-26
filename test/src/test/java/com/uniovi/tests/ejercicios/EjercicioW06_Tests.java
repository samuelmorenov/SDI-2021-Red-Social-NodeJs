package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_Invitation;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_PrivateView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW06_Tests extends BaseTests {

	/**
	 * Desde el listado de usuarios de la aplicación, enviar una invitación de
	 * amistad a un usuario. Comprobar que la solicitud de amistad aparece en el
	 * listado de invitaciones (punto siguiente).
	 */
	@Test
	public void Prueba_15() {
		//Enviar peticion
		PO_Invitation.enviarPeticion(driver, 0, 1);
		//Comprobar que existe
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(1).email, UserList.usuarios(1).password);
		PO_PrivateView.accederPagina(driver, "friends-menu", "/friend/invitationlist");
		PO_View.checkElement(driver, "text", UserList.usuarios(0).name);
	}

	/**
	 * Desde el listado de usuarios de la aplicación, enviar una invitación de
	 * amistad a un usuario al que ya le habíamos enviado la invitación previamente.
	 * No debería dejarnos enviar la invitación, se podría ocultar el botón de
	 * enviar invitación o notificar que ya había sido enviada previamente.
	 */
	@Test
	public void Prueba_16() {
		//Enviar peticion
		PO_Invitation.enviarPeticion(driver, 0, 1);
		//Comprobar que no se puede volver a enviar
		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary");
		PO_LoginView.fillForm(driver, UserList.usuarios(0).email, UserList.usuarios(0).password);
		PO_HomeView.noEsClickable(driver, "sendButton2");
	}

}
