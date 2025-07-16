package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "testimonials")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_name", nullable = false, length = 100)
    private String authorName;

    @Column(name = "author_title", length = 100)
    private String authorTitle;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "is_featured")
    private boolean isFeatured;

    @Column(name = "is_approved")
    private boolean isApproved;

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

    public Optional<Integer> getRating() {
        return Optional.ofNullable(rating);
    }
}