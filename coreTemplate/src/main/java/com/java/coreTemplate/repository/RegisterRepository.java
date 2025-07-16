package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Register;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register, Long> {

    // Find by email using derived query method
    Optional<Register> findByEmail(String email);

    // Find all active registrations (assuming there's an 'active' field)
    List<Register> findAllByActiveTrue();

    // Find by email containing a string (case-insensitive)
    List<Register> findByEmailContainingIgnoreCase(String emailPart);

    // Find registrations created after a specific date
    List<Register> findByCreatedAtAfter(LocalDateTime date);

    // Find by email or username
    List<Register> findByEmailOrUsername(String email, String username);

    // Custom JPQL query with join (assuming Register has a relationship)
    @Query("SELECT r FROM Register r JOIN r.user u WHERE u.status = :status")
    List<Register> findAllByUserStatus(@Param("status") String status);

    // Native query for complex operations
    @Query(value = "SELECT * FROM registers WHERE created_at BETWEEN :start AND :end", nativeQuery = true)
    List<Register> findBetweenDates(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    // Projection query returning only specific fields
    @Query("SELECT r.email, r.username FROM Register r WHERE r.active = true")
    List<Object[]> findActiveRegistrationsEmailAndUsername();

    // Update query (modifying query)
    @Modifying
    @Query("UPDATE Register r SET r.active = false WHERE r.createdAt < :date")
    int deactivateOldRegistrations(@Param("date") LocalDateTime date);

    // Exists query
    boolean existsByEmail(String email);

    // Count query
    long countByActiveTrue();

    // Delete query
    void deleteByEmail(String email);
}