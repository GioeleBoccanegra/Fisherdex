package com.fisherdex.backend.model;

// Un DTO (Data Transfer Object) è una classe usata per incapsulare i dati che arrivano dal frontend
public class LoginRequest {
  private String email;
  private String password;

  // costruttore vuoto(Spring lo richiede per il mapping JSOn)
  public LoginRequest() {
  }

  // Getters e setters
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
