package com.fisherdex.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fisherdex.backend.dto.CatturaResponseDTO;
import com.fisherdex.backend.dto.UserResponseDTO;
import com.fisherdex.backend.model.Cattura;
import com.fisherdex.backend.model.Provincia;
import com.fisherdex.backend.model.Specie;
import com.fisherdex.backend.model.User;
import com.fisherdex.backend.repository.CatturaRepository;
import com.fisherdex.backend.repository.ProvinciaRepository;
import com.fisherdex.backend.repository.SpecieRepository;
import com.fisherdex.backend.repository.UserRepository;

@Service
public class CatturaService {

  @Autowired
  private CatturaRepository catturaRepository;

  @Autowired
  private ProvinciaRepository provinciaRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private SpecieRepository specieRepository;

  public CatturaService(CatturaRepository cattureRepository) {
    this.catturaRepository = cattureRepository;
  }

  public List<CatturaResponseDTO> getAllCatture() {

    List<Cattura> catture = catturaRepository.findAll();

    return catture.stream().map(cattura -> {
      User user = cattura.getUser();
      UserResponseDTO userDTO = new UserResponseDTO(user.getId(), user.getUsername());
      return new CatturaResponseDTO(
          cattura.getCatchId(),
          cattura.getDescrizione(),
          cattura.getProvincia(),
          cattura.getImageUrl(),
          userDTO,
          cattura.getSpecie());
    }).toList();
  }

  public CatturaResponseDTO saveCattura(Cattura cattura) {
    if (cattura.getProvincia() == null || cattura.getProvincia().getId() == null) {
      throw new IllegalArgumentException("Provincia ID mancante");
    }
    if (cattura.getUser() == null || cattura.getUser().getId() == null) {
      throw new IllegalArgumentException("User ID mancante");
    }

    Provincia provincia = provinciaRepository.findById(cattura.getProvincia().getId())
        .orElseThrow(() -> new IllegalArgumentException("Provincia non trovata"));

    User user = userRepository.findById(cattura.getUser().getId())
        .orElseThrow(() -> new IllegalArgumentException("User non trovato"));

    Specie specie = specieRepository.findById(cattura.getSpecie().getId())
        .orElseThrow(() -> new IllegalArgumentException("User non trovato"));

    cattura.setProvincia(provincia);
    cattura.setUser(user);
    cattura.setSpecie(specie);
    Cattura catturaSalvata = catturaRepository.save(cattura);

    UserResponseDTO userDTO = new UserResponseDTO(user.getId(), user.getUsername());

    CatturaResponseDTO catturaDTO = new CatturaResponseDTO(catturaSalvata.getCatchId(), catturaSalvata.getDescrizione(),
        catturaSalvata.getProvincia(), cattura.getImageUrl(), userDTO, cattura.getSpecie());

    return catturaDTO;
  }

  public Optional<List<Cattura>> getCattureByUser(User user) {
    return catturaRepository.findByUser(user);
  }

}
