package com.fisherdex.backend.dto;

public class UserResponseDTO {
  private Long id;
  private String username;

  // Costruttore completo
  public UserResponseDTO(Long id, String username) {
    this.id = id;
    this.username = username;
  }

  // Getter e setter
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
