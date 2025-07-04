package com.fisherdex.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class userUpdateDTO {
  @NotBlank(message = "nomeutente è obbligatorio")
  @Size(min = 3, max = 20, message = "Username deve avere tra 3 e 20 caratteri")
  @Column(nullable = false, unique = true)
  private String username;

  @Email(message = "Email deve essere valida")
  @NotBlank(message = "Email è obbligatoria")
  // Colonna email, non può essere nulla e deve essere unica
  @Column(nullable = false, unique = true)
  private String email;

  // getters e setters
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

}
