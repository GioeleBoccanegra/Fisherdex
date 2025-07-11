package com.fisherdex.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fisherdex.backend.model.Cattura;
import com.fisherdex.backend.model.Likes;
import com.fisherdex.backend.model.User;
import com.fisherdex.backend.repository.CatturaRepository;
import com.fisherdex.backend.repository.LikesRepository;
import com.fisherdex.backend.repository.UserRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

@Service
public class LikesService {

  @Autowired
  private LikesRepository likeRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CatturaRepository catturaRepository;

  public void toggleLike(Long userId, Long catchId) {

    User user = userRepository.findById(userId).orElseThrow();

    Cattura cattura = catturaRepository.findById(catchId).orElseThrow();

    Optional<Likes> existingLike = likeRepository.findByUserAndCattura(user, cattura);
    if (existingLike.isPresent()) {
      likeRepository.delete(existingLike.get());
    } else {
      Likes like = new Likes();
      like.setUser(user);
      like.setCattura(cattura);
      likeRepository.save(like);
    }

  }

  public Long countLikes(Long cathcId) {
    Cattura cattura = catturaRepository.findById(cathcId).orElseThrow();
    return likeRepository.countByCattura(cattura);
  }

  public boolean userLiked(Long userId, Long catchId) {
    User user = userRepository.findById(userId).orElseThrow();

    Cattura cattura = catturaRepository.findById(catchId).orElseThrow();

    return likeRepository.findByUserAndCattura(user, cattura).isPresent();

  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public boolean deleteByCatturaId(Long catchId) {
    Cattura cattura = catturaRepository.findById(catchId).orElseThrow();
    long deleteCount = likeRepository.deleteByCattura(cattura);
    return deleteCount > 0;
  }

}
