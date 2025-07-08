package com.fisherdex.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fisherdex.backend.model.Provincia;
import com.fisherdex.backend.repository.ProvinciaRepository;

@Service
public class ProvinciaService {

  private final ProvinciaRepository provinceRepository;

  public ProvinciaService(ProvinciaRepository provinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  public List<Provincia> getAllProvince() {
    return provinceRepository.findAll();
  }

  public List<String> getProvinceNames() {
    return provinceRepository.findAll().stream()
        .map(Provincia::getNome)
        .collect(Collectors.toList());
  }

  public Optional<Provincia> getProvinciaByNome(String nome) {
    return provinceRepository.findByNome(nome);
  }

}
