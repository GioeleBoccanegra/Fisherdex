package com.fisherdex.backend.dto;

import com.fisherdex.backend.model.Provincia;
import com.fisherdex.backend.model.Specie;

public class CatturaResponseDTO {
  private Long id;
  private String descrizione;
  private Provincia provincia;
  private String imageUrl;
  private UserResponseDTO user;
  private Specie specie;

  public CatturaResponseDTO() {
  }

  public CatturaResponseDTO(Long id, String descrizione, Provincia provincia, String imageUrl, UserResponseDTO user,
      Specie specie) {
    this.id = id;
    this.descrizione = descrizione;
    this.provincia = provincia;
    this.imageUrl = imageUrl;
    this.user = user;
    this.specie = specie;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public Provincia getProvincia() {
    return provincia;
  }

  public void setProvincia(Provincia provincia) {
    this.provincia = provincia;
  }

  public UserResponseDTO getUser() {
    return user;
  }

  public void setUser(UserResponseDTO user) {
    this.user = user;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public Specie getSpecie() {
    return specie;
  }

  public void setSpecie(Specie specie) {
    this.specie = specie;
  }

}
