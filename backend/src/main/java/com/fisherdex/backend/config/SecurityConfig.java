package com.fisherdex.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // disabilita CSRF per API REST
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.POST, "/api/users").permitAll() // POST /api/users pubblico
            .requestMatchers(HttpMethod.GET, "/api/users").permitAll() // GET /api/users pubblico
            .anyRequest().authenticated() // altre rotte protette
        );

    return http.build();
  }
}
