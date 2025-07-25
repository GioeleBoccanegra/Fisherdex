package com.fisherdex.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fisherdex.backend.model.Provincia;
import com.fisherdex.backend.model.User;

// Questo è un repository che fornisce metodi per accedere al database (es: findAll, findById, save, delete)
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  // Puoi aggiungere metodi personalizzati, ad esempio:
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);

  Optional<User> findByProvincia(Provincia provincia);

}