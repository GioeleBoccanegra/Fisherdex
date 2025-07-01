package com.fisherdex.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Indica che questa classe è una entità JPA, cioè verrà mappata su una tabella del database
@Entity
// Indica il nome della tabella nel database
@Table(name = "users")
public class User {

    // Chiave primaria della tabella, con generazione automatica (auto-increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // autoincrement
    private Long id;

    // Colonna username, non può essere nulla e deve essere unica

    @NotBlank(message = "nomeutente è obbligatorio")
    @Size(min = 3, max = 20, message = "Username deve avere tra 3 e 20 caratteri")
    @Column(nullable = false, unique = true)
    private String username;

    @Email(message = "Email deve essere valida")
    @NotBlank(message = "Email è obbligatoria")
    // Colonna email, non può essere nulla e deve essere unica
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password è obbligatoria")
    @Size(min = 6, message = "La password deve essere almeno di 6 caratteri")
    // Colonna password, non può essere nulla
    @Column(nullable = false)
    private String password;

    // Costruttore vuoto richiesto da JPA
    public User() {
    }

    // Costruttore con parametri (utile per creare oggetti User facilmente)
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getter e Setter (servono per accedere/modificare i dati)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
