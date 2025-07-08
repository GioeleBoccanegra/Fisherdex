package com.fisherdex.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Provincia {

  @Id

  private Long id;
  private String nome;
  private String regione;

  public Provincia() {
  }

  @JsonCreator
  public Provincia(String nome, String regione) {
    this.nome = nome;
    this.regione = regione;
  }

  public Long getId() {
    return id;
  }

  public String getNome() {
    return nome;
  }

  public String getRegione() {
    return regione;
  }

}
