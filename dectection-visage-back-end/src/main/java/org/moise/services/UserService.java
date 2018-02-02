package org.moise.services;

import java.util.Set;

import org.moise.entities.User;
import org.moise.security.entities.UserRole;

public interface UserService {

	User addUser(User user, Set<UserRole> userRoles);
	
	User findByUsername(String username);
	
	User findByEmail (String email);
	
	User save(User user);
	
	User getUser(Long id);
	
}
