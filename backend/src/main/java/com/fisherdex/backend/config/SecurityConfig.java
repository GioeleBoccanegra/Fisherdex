package com.fisherdex.backend.config;

import java.security.Key;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Configuration // Indica a Spring che questa classe contiene configurazioni di bean
public class SecurityConfig {

  // Definisce un bean per codificare (hashare) le password usando BCrypt, molto
  // sicuro e standard
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Configura la catena di filtri di sicurezza per le richieste HTTP
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        // Disabilita la protezione CSRF (utile per API REST senza sessione browser)
        .csrf(csrf -> csrf.disable())

        // Attiva la configurazione CORS definita nel bean corsConfigurationSource
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))

        // Configura le regole di autorizzazione per le rotte HTTP
        .authorizeHttpRequests(auth -> auth
            // Permette a chiunque (anche non autenticato) di fare POST su /api/users (per
            // registrazione)
            .requestMatchers(HttpMethod.POST, "/api/users").permitAll()

            // Permette a chiunque di fare GET su /api/users (ad esempio per lista utenti
            // pubblica)
            .requestMatchers(HttpMethod.GET, "/api/users").permitAll()

            .requestMatchers(HttpMethod.POST, "/api/login").permitAll()

            .requestMatchers(HttpMethod.POST, "/api/register").permitAll()

            // Tutte le altre richieste devono essere autenticate (login obbligatorio)
            .anyRequest().authenticated())

        // Disabilita il form login di Spring Security (quello HTML classico)
        .formLogin(form -> form.disable())

        // Disabilita l’autenticazione HTTP Basic (quella con popup browser)
        .httpBasic(httpBasic -> httpBasic.disable());

    // Costruisce e restituisce la configurazione di sicurezza applicata
    return http.build();
  }

  // Definisce la configurazione CORS globale per permettere richieste dal
  // frontend
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    // Permetti le richieste provenienti da questa origine (il tuo frontend React)
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));

    // Permetti questi metodi HTTP
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

    // Permetti tutti gli headers
    configuration.setAllowedHeaders(List.of("*"));

    // Permetti l'invio di cookie e credenziali (utile se li usi)
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }

  @Component
  public class JwtUtils {
    @Value("${jwt.secret}")
    private String jwtSecret;

    private final int jwtExpirationMs = 86400000; // 24ore

    private Key getSigningKey() {

      return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(String username) {
      return Jwts.builder()
          .setSubject(username)
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
          .signWith(getSigningKey(), SignatureAlgorithm.HS256)
          .compact();
    }

    public String getUserNameFromJwtToken(String token) {
      return Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(token)
          .getBody()
          .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
      try {
        Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
        return true;
      } catch (JwtException | IllegalArgumentException e) {
        // Token non valido o scaduto
        System.out.println("Invalid JWT: " + e.getMessage());
      }
      return false;
    }
  }
}