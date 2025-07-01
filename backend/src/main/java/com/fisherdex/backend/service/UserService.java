package com.fisherdex.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fisherdex.backend.model.User;
import com.fisherdex.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  // inniettiamo il repository tramite il costruttore

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public Boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  public Boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
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

  // Questo metodo prende la password originale e la trasforma in una forma sicura
  // che si può salvare nel database senza rischi.
  public String encodePassword(String rawPassword) {
    return passwordEncoder.encode(rawPassword);
  }

  /*
   * Optional<T> è una classe wrapper introdotta in Java 8 nel package java.util.
   * Serve a gestire in modo elegante la presenza o assenza di un valore di tipo
   * T, evitando il classico null e i temuti NullPointerException.
   */

  public Optional<User> authenticateUser(String email, String password) {
    // cerca utente per email
    Optional<User> userMail = userRepository.findByEmail(email);
    if (userMail.isPresent()) {
      User user = userMail.get();
      // confronta password cryptata con quella nel db
      if (passwordEncoder.matches(password, user.getPassword())) {
        // se corretto restuituisce utente loggato
        return Optional.of(user);
      }
    }
    return Optional.empty();
  }
}
