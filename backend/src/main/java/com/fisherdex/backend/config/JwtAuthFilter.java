package com.fisherdex.backend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fisherdex.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;
  private final UserService userService;

  public JwtAuthFilter(JwtUtils jwtUtils, UserService userService) {
    this.jwtUtils = jwtUtils;
    this.userService = userService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);
      if (jwtUtils.validateJwtToken(token)) {
        String username = jwtUtils.getUserNameFromJwtToken(token);

        userService.getUserByUsername(username).ifPresent(user -> {
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null,
              List.of());
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authentication);
        });
      }
    }

    filterChain.doFilter(request, response);
  }
}
