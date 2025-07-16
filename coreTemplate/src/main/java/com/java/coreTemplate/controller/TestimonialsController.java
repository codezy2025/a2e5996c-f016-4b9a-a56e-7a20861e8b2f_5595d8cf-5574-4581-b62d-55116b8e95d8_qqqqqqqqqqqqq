package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.TestimonialsService;
import com.java.coreTemplate.model.dto.Testimonials;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/testimonials")
public class TestimonialsController {
    
    private final TestimonialsService service;
    
    public TestimonialsController(TestimonialsService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Testimonials> create(@Valid @RequestBody Testimonials entity) {
        Testimonials savedTestimonial = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/testimonials/" + savedTestimonial.getId())
                .body(savedTestimonial);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Testimonials> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Testimonials>> getAll(
            @PageableDefault(size = 20, sort = "createdAt,desc") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonials> update(
            @PathVariable Long id, 
            @Valid @RequestBody Testimonials entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/featured")
    public ResponseEntity<Page<Testimonials>> getFeaturedTestimonials(
            @PageableDefault(size = 5) Pageable pageable) {
        return ResponseEntity.ok(service.findFeaturedTestimonials(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Testimonials>> searchTestimonials(
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(service.searchTestimonials(keyword, pageable));
    }
}