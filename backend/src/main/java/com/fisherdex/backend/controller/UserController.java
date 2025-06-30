package com.fisherdex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.model.User;
import com.fisherdex.backend.service.UserService;

@RestController
@RequestMapping("/api/users") // Tutti gli endpoint avranno questo prefisso
@CrossOrigin(origins = "*") // per permettere al frontend React di connettersi
public class UserController {

  private final UserService userService;

  // iniezione service tramite costruttore
  public UserController(UserService userService) {
    this.userService = userService;
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
  public User createUser(@RequestBody User user) {
    return userService.saveUser(user);
  }

  // Delete /api/users/{id}
  @DeleteMapping("/{id}")
  public void deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
  }

}