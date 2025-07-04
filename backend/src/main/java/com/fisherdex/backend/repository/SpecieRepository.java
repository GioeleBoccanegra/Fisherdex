package com.fisherdex.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fisherdex.backend.model.Specie;

public interface SpecieRepository extends JpaRepository<Specie, Long> {

  // Metodo per trovare una specie per nome
  Optional<Specie> findByName(String name);

  // Metodo per trovare una specie per id
  Optional<Specie> findById(Long id);

  // Metodo per trovare una specie per periodo
  Optional<Specie> findByPeriodo(String periodo);

  // Metodo per trovare una specie per scientificName
  Optional<Specie> findByScientificName(String scientificName);

}