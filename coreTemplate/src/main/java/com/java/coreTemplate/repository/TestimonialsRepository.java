package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Testimonials;

import java.util.List;
import java.util.Optional;

public interface TestimonialsRepository extends JpaRepository<Testimonials, Long> {

    // Find testimonials by author name (case-insensitive)
    List<Testimonials> findByAuthorContainingIgnoreCase(String author);

    // Find approved testimonials
    List<Testimonials> findByApprovedTrue();

    // Find testimonials with rating greater than or equal to given value
    List<Testimonials> findByRatingGreaterThanEqual(int rating);

    // Find testimonials by author email (exact match)
    Optional<Testimonials> findByAuthorEmail(String email);

    // Find testimonials containing specific text in content (JPQL with modern syntax)
    @Query("SELECT t FROM Testimonials t WHERE LOWER(t.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Testimonials> searchByContent(@Param("keyword") String keyword);

    // Find top 5 highest rated testimonials
    @Query("SELECT t FROM Testimonials t ORDER BY t.rating DESC LIMIT 5")
    List<Testimonials> findTopRated();

    // Count testimonials by approval status
    long countByApproved(boolean approved);

    // Find testimonials with native query (example)
    @Query(value = "SELECT * FROM testimonials WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'", nativeQuery = true)
    List<Testimonials> findRecentTestimonials();

    // Find testimonials with pagination support (used with Pageable parameter)
    @Query("SELECT t FROM Testimonials t WHERE t.approved = :approved")
    List<Testimonials> findByApprovedStatus(@Param("approved") boolean approved, org.springframework.data.domain.Pageable pageable);
}