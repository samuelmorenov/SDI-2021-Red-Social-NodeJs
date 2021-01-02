package com.uniovi.tests.util;

import org.junit.Test;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.ejercicios.BaseTests;
import com.uniovi.tests.pageobjects.PO_HomeView;
import com.uniovi.tests.pageobjects.PO_RegisterView;
import com.uniovi.tests.pageobjects.PO_View;

public class CreateUsersTest extends BaseTests {

	@Test
	public void Create() {
		driver.navigate().to(URL + "/administrar");
		PO_View.checkElement(driver, "text", "Base de datos administrada.");
		driver.navigate().to(URL);
		for (int i = 0; i < UserList.maxUser; i++) {
			PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary");
			PO_RegisterView.fillForm(driver, UserList.usuarios(i).email, UserList.usuarios(i).name,
					UserList.usuarios(i).lastName, UserList.usuarios(i).password, UserList.usuarios(i).password);
		}
	}

}
