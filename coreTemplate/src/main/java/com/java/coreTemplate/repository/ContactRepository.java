package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Contact;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    // Find by email using derived query method
    Optional<Contact> findByEmail(String email);

    // Find all contacts with a given last name (case-insensitive)
    List<Contact> findByLastNameIgnoreCase(String lastName);

    // Find contacts by phone number prefix using LIKE
    List<Contact> findByPhoneNumberStartingWith(String prefix);

    // Find active contacts using boolean flag
    List<Contact> findByActiveTrue();

    // Custom JPQL query with join (assuming Contact has relationships)
    @Query("SELECT c FROM Contact c JOIN FETCH c.addresses WHERE c.id = :id")
    Optional<Contact> findByIdWithAddresses(@Param("id") Long id);

    // Native query for complex operations
    @Query(value = "SELECT * FROM contacts WHERE created_at > CURRENT_DATE - INTERVAL '30 days'", nativeQuery = true)
    List<Contact> findRecentContacts();

    // Projection interface for partial data retrieval
    <T> List<T> findByLastName(String lastName, Class<T> type);

    // Dynamic sorting with method name
    List<Contact> findByFirstNameContainingIgnoreCaseOrderByLastNameAsc(String firstName);

    // Using JPA Specifications for complex criteria
    // (Would need to extend JpaSpecificationExecutor<Contact> in the interface declaration)
    // List<Contact> findAll(Specification<Contact> spec);
    
    // Bulk update operation
    @Modifying
    @Query("UPDATE Contact c SET c.active = :active WHERE c.lastName = :lastName")
    int updateActiveStatusByLastName(@Param("active") boolean active, @Param("lastName") String lastName);
}