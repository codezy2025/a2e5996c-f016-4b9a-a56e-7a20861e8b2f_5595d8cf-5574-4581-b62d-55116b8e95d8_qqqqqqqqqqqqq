package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Advertise;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AdvertiseRepository extends JpaRepository<Advertise, Long> {

    // Find by title using exact match
    Optional<Advertise> findByTitle(String title);

    // Find by title containing (case-insensitive)
    List<Advertise> findByTitleContainingIgnoreCase(String titlePart);

    // Find active advertisements
    List<Advertise> findByIsActiveTrue();

    // Find advertisements within a date range
    List<Advertise> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Find by category with pagination support (implementation will be added by Spring)
    Page<Advertise> findByCategory(String category, Pageable pageable);

    // Custom JPQL query with join
    @Query("SELECT a FROM Advertise a JOIN a.category c WHERE c.name = :categoryName")
    List<Advertise> findByCategoryName(@Param("categoryName") String categoryName);

    // Native query for complex operations
    @Query(value = "SELECT * FROM advertisements WHERE MATCH(title, description) AGAINST (:searchTerm IN NATURAL LANGUAGE MODE)", 
           nativeQuery = true)
    List<Advertise> fullTextSearch(@Param("searchTerm") String searchTerm);

    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.AdvertiseSummary(a.id, a.title, a.price) FROM Advertise a WHERE a.price <= :maxPrice")
    List<AdvertiseSummary> findSummariesByMaxPrice(@Param("maxPrice") double maxPrice);

    // Update query (modifying)
    @Modifying
    @Query("UPDATE Advertise a SET a.views = a.views + 1 WHERE a.id = :id")
    void incrementViews(@Param("id") Long id);

    // Find using multiple conditions
    List<Advertise> findByCategoryAndPriceLessThanEqualAndIsActiveTrue(String category, double maxPrice);
}