package com.fisherdex.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.service.LikesService;

@RestController
@RequestMapping("/api/likes")
public class LikesController {

  @Autowired
  private LikesService likeService;

  @PostMapping("/{userId}/{catchId}")
  public ResponseEntity<Void> toggleLike(@PathVariable Long userId, @PathVariable Long catchId) {
    likeService.toggleLike(userId, catchId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/count/{catchId}")
  public ResponseEntity<Long> getLikeCount(@PathVariable Long catchId) {
    return ResponseEntity.ok(likeService.countLikes(catchId));
  }

  @GetMapping("/check/{userId}/{catchId}")
  public ResponseEntity<Boolean> hasLiked(@PathVariable Long userId, @PathVariable Long catchId) {
    return ResponseEntity.ok(likeService.userLiked(userId, catchId));
  }
}
