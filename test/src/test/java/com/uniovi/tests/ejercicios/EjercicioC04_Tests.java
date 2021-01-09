package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_Chat;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC04_Tests extends BaseTestsApi {

	/**
	 * Acceder a la lista de mensajes de un amigo “chat” y crear un nuevo mensaje,
	 * validar que el mensaje aparece en la lista de mensajes.
	 */
	@Test
	public void Prueba_28() {
		PO_LoginView.fillForm(UserList.usuarios(4).email, UserList.usuarios(4).password);
		PO_View.checkElement("text", "Lista de amigos");
		PO_View.checkElement("text", UserList.usuarios(0).email);
		PO_HomeView.clickId("button-chat-" + UserList.usuarios(0).email);
		PO_Chat.sendMessage("¿Estás libre mañana?");
		PO_View.checkElement("text", "¿Estás libre mañana?");
	}

}
