package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_LoginView;
import com.uniovi.tests.pageobjects.PO_View;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC02_Tests extends BaseTestsApi {

	/**
	 * Acceder a la lista de amigos de un usuario, que al menos tenga tres amigos.
	 */
	@Test
	public void Prueba_25() {
		PO_LoginView.fillForm(UserList.usuarios(4).email, UserList.usuarios(4).password);
		PO_View.checkElement("text", "Lista de amigos");
		PO_View.checkElement("text", UserList.usuarios(0).email);
		PO_View.checkElement("text", UserList.usuarios(1).email);
		PO_View.checkElement("text", UserList.usuarios(3).email);
	}

	/**
	 * Acceder a la lista de amigos de un usuario, y realizar un filtrado para
	 * encontrar a un amigo concreto, el nombre a buscar debe coincidir con el de un
	 * amigo.
	 */

	@Test
	public void Prueba_26() {
		PO_LoginView.fillForm(UserList.usuarios(4).email, UserList.usuarios(4).password);
		PO_View.checkElement("text", UserList.usuarios(3).name);
		PO_View.checkNoElement(UserList.usuarios(0).name);
		PO_View.checkNoElement(UserList.usuarios(1).name);
	}

}
