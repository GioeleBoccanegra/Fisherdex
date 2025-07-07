package com.fisherdex.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fisherdex.backend.model.Specie;
import com.fisherdex.backend.repository.SpecieRepository;

//Spring si occupa di creare e iniettare questa classe dove servono
@Service
public class SpecieService {

  // Viene dichiarata una variabile specieRepository per accedere al database.
  private final SpecieRepository specieRepository;

  // Viene dichiarato un costruttore per iniettare la dipendenza.
  public SpecieService(SpecieRepository specieRepository) {
    this.specieRepository = specieRepository;
  }

  public List<Specie> getAllSpecies() {
    return specieRepository.findAll();
  }

  public Specie saveSpecie(Specie specie) {
    return specieRepository.save(specie);
  }

  public Optional<Specie> getSpecieById(Long id) {
    return specieRepository.findById(id);
  }

  public Optional<Specie> getSpecieByName(String name) {
    return specieRepository.findByName(name);

  }

  public Optional<Specie> getSpecieByScientificName(String scientificName) {
    return specieRepository.findByScientificName(scientificName);
  }

  public Optional<Specie> getSpecieByPeriodo(String periodo) {
    return specieRepository.findByPeriodo(periodo);
  }

  public Optional<Specie> getSpecieByRarita(int rarita) {
    return specieRepository.findByRarita(rarita);
  }

  public void deleteSpecie(Long id) {
    specieRepository.deleteById(id);
  }

}
