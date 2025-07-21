package com.fisherdex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fisherdex.backend.model.Cattura;
import com.fisherdex.backend.model.User;

@Repository
public interface CatturaRepository extends JpaRepository<Cattura, Long> {

  Optional<List<Cattura>> findByUser(User user);

  Optional<Cattura> findByUserIdAndSpecieId(Long userId, Long specieId);

  List<Cattura> findByUserIdNot(Long userId);

}
