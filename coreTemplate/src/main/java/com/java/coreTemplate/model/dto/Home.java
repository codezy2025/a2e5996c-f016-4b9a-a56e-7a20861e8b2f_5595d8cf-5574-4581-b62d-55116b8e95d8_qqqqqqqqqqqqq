package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "home")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "bedrooms")
    private Integer bedrooms;

    @Column(name = "bathrooms")
    private Integer bathrooms;

    @Column(name = "square_footage")
    private Integer squareFootage;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_for_sale")
    private boolean isForSale;

    @Column(name = "built_year")
    private Integer builtYear;

    @Column(name = "last_renovation_year")
    private Integer lastRenovationYear;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Version
    private Long version;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}