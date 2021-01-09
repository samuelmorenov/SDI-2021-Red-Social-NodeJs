package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC03_Tests extends BaseTestsApi {

	/**
	 * Acceder a la lista de mensajes de un amigo “chat”, la lista debe contener al
	 * menos tres mensajes.
	 */
	@Test
	public void Prueba_27() {
		PO_LoginView.fillForm(UserList.usuarios(4).email, UserList.usuarios(4).password);
		PO_View.checkElement("text", "Lista de amigos");
		PO_View.checkElement("text", UserList.usuarios(0).email);
		PO_HomeView.clickId("button-chat-" + UserList.usuarios(0).email);
		PO_View.checkElement("text", "Hola Pedro, ¿qué tal?");
		PO_View.checkElement("text", "Hola Pelayo, yo muy bien, y tu ¿qué tal?");
		PO_View.checkElement("text", "Bien tambien, a ver si nos vemos");
	}

}
