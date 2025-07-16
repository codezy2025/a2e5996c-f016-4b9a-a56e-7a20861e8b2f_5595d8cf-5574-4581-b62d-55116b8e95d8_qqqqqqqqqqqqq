package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Services;

import java.util.List;
import java.util.Optional;

public interface ServicesRepository extends JpaRepository<Services, Long> {

    // Find by name using derived query method
    Optional<Services> findByName(String name);

    // Find all active services
    List<Services> findAllByIsActiveTrue();

    // Find by name containing (case-insensitive)
    List<Services> findByNameContainingIgnoreCase(String name);

    // Custom JPQL query with modern parameter binding
    @Query("SELECT s FROM Services s WHERE s.category = :category AND s.isActive = true")
    List<Services> findActiveServicesByCategory(@Param("category") String category);

    // Native query with projection
    @Query(value = "SELECT name, description FROM services WHERE price BETWEEN :minPrice AND :maxPrice", 
           nativeQuery = true)
    List<Object[]> findServiceNamesAndDescriptionsByPriceRange(
            @Param("minPrice") double minPrice, 
            @Param("maxPrice") double maxPrice);

    // Exists check with modern syntax
    boolean existsByNameAndCategory(String name, String category);

    // Update method using @Modifying
    @Modifying
    @Query("UPDATE Services s SET s.isActive = :status WHERE s.id = :id")
    int updateServiceStatus(@Param("id") Long id, @Param("status") boolean status);
}