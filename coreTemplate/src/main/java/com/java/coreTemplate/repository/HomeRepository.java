package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Home;

import java.util.List;
import java.util.Optional;

public interface HomeRepository extends JpaRepository<Home, Long> {

    // Derived query method to find homes by address
    List<Home> findByAddressContainingIgnoreCase(String addressPart);

    // Derived query method to find homes by square footage greater than
    List<Home> findBySquareFootageGreaterThanEqual(double minSquareFootage);

    // JPQL query with modern parameter binding
    @Query("SELECT h FROM Home h WHERE h.bedrooms >= :minBedrooms AND h.bathrooms >= :minBathrooms")
    List<Home> findHomesWithMinimumRooms(
            @Param("minBedrooms") int minBedrooms,
            @Param("minBathrooms") double minBathrooms);

    // Native query with projection
    @Query(value = "SELECT h.address, h.price FROM homes h WHERE h.price BETWEEN :minPrice AND :maxPrice", nativeQuery = true)
    List<Object[]> findHomeAddressesByPriceRange(
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice);

    // Find by multiple conditions using Optional
    Optional<Home> findByAddressAndZipCode(String address, String zipCode);

    // Custom query with JOIN FETCH to avoid N+1 problem
    @Query("SELECT DISTINCT h FROM Home h LEFT JOIN FETCH h.amenities WHERE h.id = :id")
    Optional<Home> findByIdWithAmenities(@Param("id") Long id);

    // Using record projection
    @Query("SELECT new com.java.coreTemplate.model.dto.HomeSummary(h.id, h.address, h.price) FROM Home h WHERE h.price < :maxPrice")
    List<HomeSummary> findHomeSummariesBelowPrice(@Param("maxPrice") double maxPrice);

    // Dynamic sorting with method name
    List<Home> findByOrderByPriceDesc();
    List<Home> findByOrderBySquareFootageAsc();

    // Using EXISTS in query
    @Query("SELECT h FROM Home h WHERE EXISTS (SELECT 1 FROM h.amenities a WHERE a.name = :amenityName)")
    List<Home> findHomesWithSpecificAmenity(@Param("amenityName") String amenityName);

    // Update query with @Modifying
    @Modifying
    @Query("UPDATE Home h SET h.price = h.price * (1 + :percentageIncrease/100) WHERE h.id IN :ids")
    int bulkUpdatePrice(@Param("ids") List<Long> ids, @Param("percentageIncrease") double percentageIncrease);
}