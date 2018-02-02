package org.moise.repositories;

import java.util.List;

import org.moise.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsername(String username);
	User findByEmail(String email);
	List<User> findAll();
	
}
