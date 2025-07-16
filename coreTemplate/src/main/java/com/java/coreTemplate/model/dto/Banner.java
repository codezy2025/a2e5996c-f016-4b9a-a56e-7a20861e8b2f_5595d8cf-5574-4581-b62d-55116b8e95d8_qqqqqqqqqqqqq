package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "banner")
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;

    @Column(name = "target_url", length = 255)
    private String targetUrl;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "display_order")
    private Integer displayOrder;

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

    // Custom getter for boolean to follow 'is' prefix requirement
    public boolean isActive() {
        return isActive;
    }
}