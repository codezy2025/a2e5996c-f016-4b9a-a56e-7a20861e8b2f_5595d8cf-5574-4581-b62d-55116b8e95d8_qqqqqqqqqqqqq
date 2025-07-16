package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "login")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "is_locked", nullable = false)
    private boolean isLocked;

    @Column(name = "failed_attempts")
    private Integer failedAttempts;

    @Column(name = "last_login_at")
    private Instant lastLoginAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Version
    private Long version;

    // Custom getter for Optional fields
    public Optional<Instant> getLastLoginAt() {
        return Optional.ofNullable(lastLoginAt);
    }

    public Optional<Instant> getUpdatedAt() {
        return Optional.ofNullable(updatedAt);
    }

    public Optional<Integer> getFailedAttempts() {
        return Optional.ofNullable(failedAttempts);
    }
}