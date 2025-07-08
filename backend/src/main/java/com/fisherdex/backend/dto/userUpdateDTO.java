package com.fisherdex.backend.dto;

import com.fisherdex.backend.model.Provincia;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class userUpdateDTO {
  @NotBlank(message = "nomeutente è obbligatorio")
  @Size(min = 3, max = 20, message = "Username deve avere tra 3 e 20 caratteri")
  @Column(nullable = false, unique = true)
  private String username;

  @ManyToOne
  @JoinColumn(name = "provincia_id", nullable = false)
  private Provincia provincia;

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

  public Provincia getProvincia() {
    return provincia;
  }

  public void setProvincia(Provincia provincia) {
    this.provincia = provincia;
  }

}
