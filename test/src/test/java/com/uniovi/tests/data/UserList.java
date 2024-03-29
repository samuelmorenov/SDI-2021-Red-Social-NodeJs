package com.uniovi.tests.data;



public class UserList {

	public static final int maxUser = 5;

	public final static UserDto admin = new UserDto("admin@email.com", "Admin", "Istrador", "admin");

	public final static UserDto usuarios(int iterator) {
		UserDto[] list = new UserDto[maxUser];
		list[0] = new UserDto("pedro@email.com", "Pedro", "Díaz", "123456");
		list[1] = new UserDto("lucas@email.com", "Lucas", "Núñez", "123456");
		list[2] = new UserDto("maria@email.com", "María", "Rodríguez", "123456");
		list[3] = new UserDto("marta@email.com", "Marta", "Almonte", "123456");
		list[4] = new UserDto("pelayo@email.com", "Pelayo", "Valdes", "123456");
		return list[iterator];
	}

	public final static UserDto usuariosTest(int iterator) {
		UserDto[] list = new UserDto[2];
		list[0] = new UserDto("liliana@email.com", "Liliana", "Gomez", "123456");
		list[1] = new UserDto("florentina@email.com", "Florentina", "Azul", "123456");

		return list[iterator];
	}

}
