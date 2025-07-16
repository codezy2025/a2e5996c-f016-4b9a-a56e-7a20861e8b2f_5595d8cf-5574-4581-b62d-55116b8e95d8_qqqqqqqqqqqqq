package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.TestimonialsRepository;
import com.java.coreTemplate.model.dto.Testimonials;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class TestimonialsService {

    private final TestimonialsRepository repository;

    public TestimonialsService(TestimonialsRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "testimonials", allEntries = true)
    public Testimonials save(Testimonials entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "testimonials", key = "#id")
    public Optional<Testimonials> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("testimonials")
    public Page<Testimonials> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable("testimonials")
    public List<Testimonials> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "testimonials", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Cacheable("testimonials")
    public List<Testimonials> findByRatingGreaterThanEqual(int rating) {
        return repository.findByRatingGreaterThanEqual(rating);
    }

    @Transactional
    @CacheEvict(value = "testimonials", key = "#id")
    public Testimonials updateTestimonial(Long id, Testimonials updatedTestimonial) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setContent(updatedTestimonial.getContent());
                    existing.setAuthor(updatedTestimonial.getAuthor());
                    existing.setRating(updatedTestimonial.getRating());
                    existing.setActive(updatedTestimonial.isActive());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Testimonial not found with id: " + id));
    }

    @Cacheable("testimonials")
    public List<Testimonials> searchTestimonials(String keyword) {
        return repository.findByContentContainingIgnoreCaseOrAuthorContainingIgnoreCase(keyword, keyword);
    }
}