package com.fisherdex.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fisherdex.backend.model.User;

// Questo è un repository che fornisce metodi per accedere al database (es: findAll, findById, save, delete)
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  // Puoi aggiungere metodi personalizzati, ad esempio:
  User findByUsername(String username);
}