package com.uniovi.tests.data;

public class UserDto {
	public String email;
	public String name;
	public String lastName;
	public String password;

	public UserDto() {
	}

	public UserDto(String email, String name, String lastName, String password) {
		super();
		this.email = email;
		this.name = name;
		this.lastName = lastName;
		this.password = password;
	}
}
