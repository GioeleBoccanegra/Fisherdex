package com.fisherdex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.model.Provincia;
import com.fisherdex.backend.service.ProvinciaService;

@RestController
@RequestMapping("/api/province")
public class ProvinciaController {

  private final ProvinciaService provinceService;

  public ProvinciaController(ProvinciaService provinceService) {
    this.provinceService = provinceService;
  }

  @GetMapping
  public ResponseEntity<List<Provincia>> getAllProvince() {
    List<Provincia> province = provinceService.getAllProvince();
    if (province == null || province.isEmpty()) {
      // Puoi restituire 204 No Content o una lista vuota JSON
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok().body(province);
  }

  @GetMapping("/names")
  public ResponseEntity<List<String>> getProvinceNames() {
    List<String> names = provinceService.getProvinceNames();
    if (names == null || names.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok().body(names);
  }

  @GetMapping("/{nome}")
  public ResponseEntity<Provincia> getProvinciaByNome(@PathVariable String nome) {
    return provinceService.getProvinciaByNome(nome)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
