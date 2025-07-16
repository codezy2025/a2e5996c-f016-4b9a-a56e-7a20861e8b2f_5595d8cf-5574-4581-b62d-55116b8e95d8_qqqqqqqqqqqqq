package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Login;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Long> {

    // Find by username (case-insensitive)
    Optional<Login> findByUsernameIgnoreCase(String username);

    // Find by email (case-insensitive)
    Optional<Login> findByEmailIgnoreCase(String email);

    // Find by username or email
    Optional<Login> findByUsernameOrEmail(String username, String email);

    // Check if username exists (case-insensitive)
    boolean existsByUsernameIgnoreCase(String username);

    // Check if email exists (case-insensitive)
    boolean existsByEmailIgnoreCase(String email);

    // Find active users
    List<Login> findByActiveTrue();

    // Find users created after a certain date
    List<Login> findByCreatedAtAfter(LocalDateTime date);

    // Find users by role
    List<Login> findByRole(String role);

    // Custom query with JPQL
    @Query("SELECT l FROM Login l WHERE l.lastLogin < :date AND l.active = true")
    List<Login> findInactiveUsersSince(@Param("date") LocalDateTime date);

    // Native query example
    @Query(value = "SELECT * FROM logins WHERE failed_attempts >= :maxAttempts", nativeQuery = true)
    List<Login> findLockedAccounts(@Param("maxAttempts") int maxAttempts);

    // Update last login time
    @Query("UPDATE Login l SET l.lastLogin = CURRENT_TIMESTAMP WHERE l.id = :id")
    @Modifying
    void updateLastLogin(@Param("id") Long id);

    // Projection query
    @Query("SELECT l.username FROM Login l WHERE l.role = :role")
    List<String> findUsernamesByRole(@Param("role") String role);
}