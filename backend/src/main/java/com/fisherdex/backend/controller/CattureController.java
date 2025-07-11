package com.fisherdex.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.dto.CatturaResponseDTO;
import com.fisherdex.backend.model.Cattura;

import com.fisherdex.backend.service.CatturaService;
import com.fisherdex.backend.service.LikesService;

@RestController
@RequestMapping("api/cattura")
public class CattureController {

  private final CatturaService catturaService;

  private final LikesService likesService;

  public CattureController(CatturaService catturaService, LikesService likesService) {
    this.catturaService = catturaService;
    this.likesService = likesService;

  }

  @GetMapping
  public ResponseEntity<List<CatturaResponseDTO>> getCatture() {
    List<CatturaResponseDTO> listaCatture = catturaService.getAllCatture();

    if (listaCatture.isEmpty() || listaCatture == null) {
      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.ok().body(listaCatture);

  }

  @PostMapping
  public ResponseEntity<?> createCattura(@RequestBody Cattura cattura) {

    try {
      CatturaResponseDTO catturaSalvata = catturaService.saveCattura(cattura);
      return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("risposata", catturaSalvata));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<CatturaResponseDTO>> getCattureUser(@PathVariable("userId") Long userId) {

    return catturaService.getCatturaByUserId(userId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/{userId}/{specieId}")
  public ResponseEntity<CatturaResponseDTO> getCatturaSpecieUser(@PathVariable("userId") Long userId,
      @PathVariable("specieId") Long specieId) {
    Optional<CatturaResponseDTO> cattura = catturaService.trovaCatturaByUserIdAndSpecieId(userId, specieId);
    if (cattura.isPresent()) {
      return ResponseEntity.ok(cattura.get());
    } else {
      return ResponseEntity.notFound().build();
    }

  }

  @DeleteMapping("/post/{catchId}")
  public ResponseEntity<Void> deleteCattura(@PathVariable("catchId") Long catchId) {
    likesService.deleteByCatturaId(catchId);
    catturaService.deleteCattura(catchId);
    return ResponseEntity.noContent().build();
  };

}
