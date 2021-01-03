package com.uniovi.tests.pageobjects;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import com.uniovi.tests.util.SeleniumUtils;

public class PO_PrivateView extends PO_NavView {
	static public void fillFormAddMark(int userOrder, String descriptionp, String scorep) {
		// Esperamos 5 segundo a que carge el DOM porque en algunos equipos falla
		SeleniumUtils.esperarSegundos(5);
		// Seleccionamos el alumnos userOrder
		new Select(driver.findElement(By.id("user"))).selectByIndex(userOrder);
		// Rellenemos el campo de descripción
		WebElement description = driver.findElement(By.name("description"));
		description.clear();
		description.sendKeys(descriptionp);
		WebElement score = driver.findElement(By.name("score"));
		score.click();
		score.clear();
		score.sendKeys(scorep);
		By boton = By.className("btn");
		driver.findElement(boton).click();
	}

	static public void login(String emailp, String passwordp, String text) {

		// Vamos al formulario de logueo.
		PO_HomeView.clickOption("login", "class", "btn btn-primary");
		// Rellenamos el formulario
		PO_LoginView.fillForm(emailp, passwordp);
		// COmprobamos que entramos en la pagina privada del Profesor
		PO_View.checkElement("text", text);

	}

	static public void accederPagina(String lista, String elemento, List<WebElement> elementos) {
		// Pinchamos en la opción de menu de Notas: //li[contains(@id, 'marks-menu')]/a
		elementos = PO_View.checkElement("free", "//li[contains(@id, '" + lista + "')]/a");
		elementos.get(0).click();
		// Pinchamos en la opción de lista de notas.
		elementos = PO_View.checkElement("free", "//a[contains(@href,'" + elemento + "')]");
		elementos.get(0).click();
	}

	static public void accederPagina(String lista, String elemento) {
		List<WebElement> elementos = null;
		// Pinchamos en la opción de menu de Notas: //li[contains(@id, 'marks-menu')]/a
		elementos = PO_View.checkElement("free", "//li[contains(@id, '" + lista + "')]/a");
		elementos.get(0).click();
		// Pinchamos en la opción de lista de notas.
		elementos = PO_View.checkElement("free", "//a[contains(@href,'" + elemento + "')]");
		elementos.get(0).click();
	}
}