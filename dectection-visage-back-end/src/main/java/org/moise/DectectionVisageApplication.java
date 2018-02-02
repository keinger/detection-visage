package org.moise;


import java.util.HashSet;
import java.util.Set;

import org.moise.security.entities.UserRole;
import org.moise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DectectionVisageApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;
	
	public static void main(String[] args) {
		SpringApplication.run(DectectionVisageApplication.class, args);
	}

	@Override
	public void run(String... arg0) throws Exception {
		org.moise.entities.User user1 = new org.moise.entities.User();
		user1.setUsername("j");
		user1.setPassword(org.moise.security.SecurityUtility.passwordEncoder().encode("p"));
		user1.setEmail("JAdams@gmail.com");
		Set<UserRole> userRoles = new HashSet<>();
		org.moise.security.entities.Role role1 = new org.moise.security.entities.Role();
		role1.setRoleId(1);
		role1.setName("ROLE_USER");
		userRoles.add(new org.moise.security.entities.UserRole(user1, role1));
		
		userService.addUser(user1, userRoles);
		
		
	}
}
