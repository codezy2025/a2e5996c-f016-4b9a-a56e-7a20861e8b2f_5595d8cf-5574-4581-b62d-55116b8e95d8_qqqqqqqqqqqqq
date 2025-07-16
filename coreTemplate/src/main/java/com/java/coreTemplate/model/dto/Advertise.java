package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "advertise")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Advertise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 120)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "price", precision = 10, scale = 2)
    private Double price;

    @Column(name = "is_featured")
    private boolean isFeatured;

    @Column(name = "is_active")
    private boolean isActive;

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