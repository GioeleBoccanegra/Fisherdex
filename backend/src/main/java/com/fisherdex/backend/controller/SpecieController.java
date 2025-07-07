package com.fisherdex.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.model.Specie;
import com.fisherdex.backend.service.SpecieService;

@RestController
@RequestMapping("/api/specie")
public class SpecieController {

  private final SpecieService specieService;

  public SpecieController(SpecieService specieService) {
    this.specieService = specieService;
  }

  @GetMapping
  public List<Specie> getAll() {
    return specieService.getAllSpecies();
  }
}
