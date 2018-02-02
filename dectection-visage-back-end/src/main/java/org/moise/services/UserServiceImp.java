package org.moise.services;

import java.util.Set;

import javax.transaction.Transactional;

import org.moise.entities.User;
import org.moise.repositories.RoleRepository;
import org.moise.repositories.UserRepository;
import org.moise.security.entities.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

	public static final Logger LOG = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	@Transactional
	public User addUser(User user, Set<UserRole> userRoles) {
		User localUser = userRepository.findByUsername(user.getUsername());
		
		if(localUser != null) {
			LOG.info("Utilisateur {} existe", user.getUsername());
		}
		else {
			for (UserRole ur: userRoles) {
				roleRepository.save(ur.getRole());
			}
			
			user.getUserRole().addAll(userRoles);
			
			localUser = userRepository.save(user);
		}
		
		
		return localUser;
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public User getUser(Long id) {
		return userRepository.findOne(id);
	}

}
