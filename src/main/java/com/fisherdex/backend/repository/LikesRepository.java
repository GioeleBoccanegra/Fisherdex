package com.fisherdex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fisherdex.backend.model.Cattura;
import com.fisherdex.backend.model.Likes;
import com.fisherdex.backend.model.User;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

  long countByCattura(Cattura cattura);

  Optional<Likes> findByUserAndCattura(User user, Cattura cattura);

  List<Likes> findByCattura(Cattura cattura);

  long deleteByCattura(Cattura cattura);

}
