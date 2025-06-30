package com.fisherdex.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fisherdex.backend.model.User;
import com.fisherdex.backend.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  // inniettiamo il repository tramite il costruttore

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // ritorna tutti gli utenti
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // ritorna utente per id
  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  // salva utente
  public User saveUser(User user) {
    return userRepository.save(user);
  }

  // elimina utente
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
