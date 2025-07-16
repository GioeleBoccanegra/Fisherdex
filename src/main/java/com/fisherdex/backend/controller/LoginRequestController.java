package com.fisherdex.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.config.JwtUtils;
import com.fisherdex.backend.model.LoginRequest;
import com.fisherdex.backend.model.User;
import com.fisherdex.backend.service.UserService;

@RestController // ✅ Senza questa annotazione Spring ignora il controller

public class LoginRequestController {

  private final UserService userService;
  private final JwtUtils jwtUtils;

  public LoginRequestController(UserService userService, JwtUtils jwtUtils) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
  }

  // Spring la trasforma automaticamente in un oggetto LoginRequest la chiamata
  // post del form login tramite il model LoginREquest
  @PostMapping("/api/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    Optional<User> userOpt = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

    // per ora genero fake toke poi jwt

    if (userOpt.isPresent()) {
      User user = userOpt.get();
      // Genera il token JWT passando il nome utente o un identificatore unico
      String token = jwtUtils.generateJwtToken(user.getId());

      // salvo token in mappa e lo restituisco
      Map<String, String> response = new HashMap<>();
      response.put("token", token);
      response.put("username", userOpt.get().getUsername());
      response.put("userId", userOpt.get().getId().toString());

      // Questa riga restituisce una risposta HTTP 200 OK al client, con un oggetto
      // response nel corpo della risposta.
      return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(401).body("Credenziali non valide");
  }

}
