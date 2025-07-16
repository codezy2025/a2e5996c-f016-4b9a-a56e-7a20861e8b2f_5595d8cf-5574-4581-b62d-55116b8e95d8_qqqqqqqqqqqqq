package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Navbar;

import java.util.List;
import java.util.Optional;

public interface NavbarRepository extends JpaRepository<Navbar, Long> {

    // Find by title using case-insensitive search
    Optional<Navbar> findByTitleIgnoreCase(String title);

    // Find all active navbar items
    List<Navbar> findByIsActiveTrue();

    // Find navbar items by parent ID (for hierarchical menus)
    List<Navbar> findByParentId(Long parentId);

    // Find navbar items by type and ordered by display order
    List<Navbar> findByTypeOrderByDisplayOrderAsc(String type);

    // Custom JPQL query with projection
    @Query("SELECT n.id, n.title, n.path FROM Navbar n WHERE n.type = :type AND n.isActive = true")
    List<Object[]> findActiveNavbarItemsByType(@Param("type") String type);

    // Find navbar items with path containing a specific string
    List<Navbar> findByPathContaining(String pathSegment);

    // Count active navbar items
    long countByIsActiveTrue();

    // Check if a navbar item exists with the given title
    boolean existsByTitle(String title);

    // Delete navbar items by type
    void deleteByType(String type);

    // Find navbar items with display order greater than specified value
    List<Navbar> findByDisplayOrderGreaterThan(int displayOrder);

    // Find navbar items by multiple criteria
    List<Navbar> findByTypeAndIsActiveAndParentIdIsNull(String type, boolean isActive);
}