package com.fisherdex.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "specie")
public class Specie {
  @Id
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String scientificName;

  @Column(nullable = false)
  private int rarita;

  @Column(nullable = false)
  private String imageUrl;

  @Column(nullable = false)
  private String periodo;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String descrizione;

  // getters e setters

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getScientificName() {
    return scientificName;
  }

  public void setScientificName(String scientificName) {
    this.scientificName = scientificName;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public int getRarita() {
    return rarita;
  }

  public void setRarita(int rarita) {
    this.rarita = rarita;
  }

}
