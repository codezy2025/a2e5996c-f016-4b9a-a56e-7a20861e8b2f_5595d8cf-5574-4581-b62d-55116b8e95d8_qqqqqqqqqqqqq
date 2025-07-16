package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Service;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    // Derived query method to find services by name (case-insensitive)
    List<Service> findByNameContainingIgnoreCase(String name);

    // Derived query method to find active services
    List<Service> findByActiveTrue();

    // JPQL query with modern parameter binding
    @Query("SELECT s FROM Service s WHERE s.category = :category AND s.active = true")
    List<Service> findActiveServicesByCategory(@Param("category") String category);

    // Native query with projection
    @Query(value = "SELECT s.id, s.name FROM services s WHERE s.price BETWEEN :minPrice AND :maxPrice", nativeQuery = true)
    List<Object[]> findServiceNamesAndIdsByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

    // Optional return type for single result queries
    Optional<Service> findByCode(String code);

    // Exists query method
    boolean existsByCode(String code);

    // Custom delete method with transactional annotation
    @Modifying
    @Transactional
    @Query("DELETE FROM Service s WHERE s.active = false AND s.createdAt < :cutoffDate")
    int deleteInactiveServicesOlderThan(@Param("cutoffDate") LocalDateTime cutoffDate);

    // Stream support for large result sets
    @Query("SELECT s FROM Service s WHERE s.category = :category")
    Stream<Service> streamAllByCategory(@Param("category") String category);

    // Entity graph for optimized loading
    @EntityGraph(attributePaths = {"dependencies", "provider"})
    Optional<Service> findWithDependenciesById(Long id);

    // Dynamic sorting with Pageable
    Page<Service> findByActiveTrue(Pageable pageable);
}