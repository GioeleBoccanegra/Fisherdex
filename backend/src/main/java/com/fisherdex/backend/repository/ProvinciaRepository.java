package com.fisherdex.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fisherdex.backend.model.Provincia;

@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {

  Optional<Provincia> findByNome(String nome);

}