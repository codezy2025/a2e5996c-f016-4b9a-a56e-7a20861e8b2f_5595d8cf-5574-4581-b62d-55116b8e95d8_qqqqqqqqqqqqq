package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.LoginService;
import com.java.coreTemplate.model.dto.Login;
import com.java.coreTemplate.model.dto.LoginResponse;
import com.java.coreTemplate.model.dto.LoginRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {
    private final LoginService loginService;
    
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = loginService.authenticate(loginRequest);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody LoginRequest registrationRequest) {
        LoginResponse response = loginService.register(registrationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<Login> getUserById(@PathVariable Long id) {
        return loginService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/users")
    public ResponseEntity<Page<Login>> getAllUsers(
            @PageableDefault(size = 20, sort = "username") Pageable pageable) {
        Page<Login> users = loginService.findAll(pageable);
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@RequestParam String refreshToken) {
        LoginResponse response = loginService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer " prefix
        loginService.logout(token);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/me")
    public ResponseEntity<Login> getCurrentUser() {
        Login currentUser = loginService.getCurrentUser();
        return ResponseEntity.ok(currentUser);
    }
}