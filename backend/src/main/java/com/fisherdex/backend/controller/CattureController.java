package com.fisherdex.backend.controller;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Comparator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fisherdex.backend.dto.CatturaResponseDTO;
import com.fisherdex.backend.dto.UserResponseDTO;
import com.fisherdex.backend.model.Cattura;
import com.fisherdex.backend.model.PagedResponse;
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

  @GetMapping("/filtrate")
  public ResponseEntity<PagedResponse<CatturaResponseDTO>> getFilteredCatture(
      @RequestParam Long userId,
      @RequestParam Long provinciaId,
      @RequestParam(defaultValue = "0") int page, // pagina 0-based
      @RequestParam(defaultValue = "50") int size // dimensione pagina
  ) {
    List<Cattura> tutteCatture = catturaService.getAllExcludingUser(userId);
    OffsetDateTime setteGiorniFa = OffsetDateTime.now().minusDays(7);

    List<Cattura> recentiStessaProvincia = tutteCatture.stream()
        .filter(c -> c.getProvincia().getId().equals(provinciaId) &&
            c.getDataCattura().isAfter(setteGiorniFa))
        .sorted(Comparator.comparing(Cattura::getDataCattura).reversed())
        .toList();

    List<Cattura> altre = tutteCatture.stream()
        .filter(c -> !c.getProvincia().getId().equals(provinciaId) ||
            c.getDataCattura().isBefore(setteGiorniFa))
        .sorted(Comparator.comparing(Cattura::getDataCattura).reversed())
        .toList();

    List<Cattura> finalList = new ArrayList<>();
    finalList.addAll(recentiStessaProvincia);
    finalList.addAll(altre);

    int totalElements = finalList.size();
    int totalPages = (int) Math.ceil((double) totalElements / size);

    int start = page * size;
    if (start >= totalElements) {
      // pagina oltre i dati disponibili
      return ResponseEntity.noContent().build();
    }
    int end = Math.min(start + size, totalElements);

    List<Cattura> pagedList = finalList.subList(start, end);

    List<CatturaResponseDTO> responseList = pagedList.stream()
        .map(c -> {
          CatturaResponseDTO dto = new CatturaResponseDTO();
          UserResponseDTO userDTO = new UserResponseDTO(c.getUser().getId(), c.getUser().getUsername());
          dto.setId(c.getCatchId());
          dto.setDataCattura(c.getDataCattura());
          dto.setProvincia(c.getProvincia());
          dto.setUser(userDTO);
          return dto;
        })
        .toList();

    PagedResponse<CatturaResponseDTO> pagedResponse = new PagedResponse<>();
    pagedResponse.setContent(responseList);
    pagedResponse.setPage(page);
    pagedResponse.setSize(size);
    pagedResponse.setTotalElements(totalElements);
    pagedResponse.setTotalPages(totalPages);

    return ResponseEntity.ok(pagedResponse);
  }

}
