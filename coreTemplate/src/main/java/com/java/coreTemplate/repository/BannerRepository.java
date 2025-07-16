package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Banner;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BannerRepository extends JpaRepository<Banner, Long> {

    // Find by title using exact match
    Optional<Banner> findByTitle(String title);

    // Find by title containing a string (case-insensitive)
    List<Banner> findByTitleContainingIgnoreCase(String titleFragment);

    // Find active banners (isActive = true)
    List<Banner> findByIsActiveTrue();

    // Find banners within a date range
    List<Banner> findByStartDateBeforeAndEndDateAfter(LocalDateTime date);

    // Find banners by priority greater than or equal to
    List<Banner> findByPriorityGreaterThanEqual(int priority);

    // Custom JPQL query with join
    @Query("SELECT b FROM Banner b JOIN b.category c WHERE c.name = :categoryName")
    List<Banner> findByCategoryName(@Param("categoryName") String categoryName);

    // Native query for complex operations
    @Query(value = "SELECT * FROM banners WHERE " +
            "(:searchTerm IS NULL OR title LIKE %:searchTerm%) AND " +
            "(:isActive IS NULL OR is_active = :isActive) " +
            "ORDER BY priority DESC", nativeQuery = true)
    List<Banner> searchBanners(
            @Param("searchTerm") String searchTerm,
            @Param("isActive") Boolean isActive);

    // Projection query returning only specific fields
    @Query("SELECT new com.java.coreTemplate.model.dto.BannerSummary(b.id, b.title, b.priority) " +
            "FROM Banner b WHERE b.isActive = true")
    List<BannerSummary> findActiveBannerSummaries();

    // Find by multiple conditions using JPA Criteria API through method name
    List<Banner> findByIsActiveAndPriorityBetweenAndStartDateBeforeAndEndDateAfter(
            boolean isActive, int minPriority, int maxPriority, 
            LocalDateTime startDate, LocalDateTime endDate);

    // Update query using @Modifying
    @Modifying
    @Query("UPDATE Banner b SET b.isActive = :isActive WHERE b.id = :id")
    int updateActiveStatus(@Param("id") Long id, @Param("isActive") boolean isActive);

    // Delete inactive banners older than specific date
    @Modifying
    @Query("DELETE FROM Banner b WHERE b.isActive = false AND b.endDate < :cutoffDate")
    int deleteInactiveBannersOlderThan(@Param("cutoffDate") LocalDateTime cutoffDate);
}