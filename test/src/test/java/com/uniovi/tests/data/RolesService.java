package com.uniovi.tests.data;

import org.springframework.stereotype.Service;

@Service
public class RolesService {
	static String[] roles = { "ROLE_USER", "ROLE_ADMIN" };

	public static String[] getRoles() {
		return roles;
	}
}