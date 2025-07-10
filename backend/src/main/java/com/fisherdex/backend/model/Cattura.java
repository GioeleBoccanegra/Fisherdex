package com.fisherdex.backend.model;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Cattura {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long catchId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "provincia_id", nullable = false)
  private Provincia provincia;

  @ManyToOne
  @JoinColumn(name = "specie_id", nullable = false)
  private Specie specie;

  @Column(nullable = false)
  private OffsetDateTime dataCattura;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String descrizione;

  @Column(nullable = false)
  private String imageUrl;

  // Getter e Setter

  public Long getCatchId() {
    return catchId;
  }

  public void setCatchId(Long catchId) {
    this.catchId = catchId;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Provincia getProvincia() {
    return provincia;
  }

  public void setProvincia(Provincia provincia) {
    this.provincia = provincia;
  }

  public Specie getNomeSpecie() {
    return specie;
  }

  public void setNomeSpecie(Specie specie) {
    this.specie = specie;
  }

  public OffsetDateTime getDataCattura() {
    return dataCattura;
  }

  public void setDataCattura(OffsetDateTime dataCattura) {
    this.dataCattura = dataCattura;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
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
