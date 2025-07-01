package com.fisherdex.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.fisherdex.backend.config.JwtUtils;
import com.fisherdex.backend.model.User;
import com.fisherdex.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users") // Tutti gli endpoint avranno questo prefisso
public class UserController {

  private final UserService userService;
  private final JwtUtils jwtUtils;

  // iniezione service tramite costruttore
  public UserController(UserService userService, JwtUtils jwtUtils) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
  }

  // endpoint per ottenere tutti gli utenti
  @GetMapping
  public List<User> getAllUsers() {
    return userService.getAllUsers();
  }

  // GET /api/users/{id}
  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {

    return userService.getUserById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  // POST /api/users
  @PostMapping
  public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
    // controlla se mail esiste già
    if (userService.emailExists(user.getEmail())) {
      return ResponseEntity.badRequest().body(Map.of("email", "Email già esistente"));
    }

    // Controlla se username esiste già (se vuoi)
    if (userService.usernameExists(user.getUsername())) {
      return ResponseEntity.badRequest().body(Map.of("username", "Username già esistente"));
    }
    // Hasha la password prima di salvare
    String rawPassword = user.getPassword();
    String encodedPassword = userService.encodePassword(rawPassword);
    user.setPassword(encodedPassword);
    User savedUser = userService.saveUser(user);

    // Non inviare la password nella risposta
    savedUser.setPassword(null);

    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

  }

  // Delete /api/users/{id}
  @DeleteMapping("/{id}")
  public void deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach(error -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return ResponseEntity.badRequest().body(errors);
  }

  @GetMapping("/me")
  public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body("token mancante o malformato");
    }

    String token = authHeader.substring(7);// rimuove bearer

    if (!jwtUtils.validateJwtToken(token)) {
      return ResponseEntity.status(401).body("token non valido");
    }

    String username = jwtUtils.getUserNameFromJwtToken(token);

    Optional<User> userOpt = userService.getUserByUsername(username);

    if (userOpt.isEmpty()) {
      return ResponseEntity.status(404).body("Utente non trovato");
    }

    User user = userOpt.get();

    user.setPassword(null);
    return ResponseEntity.ok(user);
  }

}