package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.java.coreTemplate.repository.AdvertiseRepository;
import com.java.coreTemplate.model.dto.Advertise;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class AdvertiseService {

    private final AdvertiseRepository repository;

    public AdvertiseService(AdvertiseRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "advertisements", allEntries = true)
    public Advertise save(Advertise entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "advertisements", key = "#id")
    public Optional<Advertise> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("advertisements")
    public List<Advertise> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "advertisements", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<Advertise> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Advertise> findByTitleContaining(String keyword) {
        return repository.findByTitleContainingIgnoreCase(keyword);
    }

    @Transactional
    @CacheEvict(value = "advertisements", key = "#id")
    public Advertise update(Long id, Advertise updatedAdvertise) {
        return repository.findById(id)
                .map(existingAdvertise -> {
                    existingAdvertise.setTitle(updatedAdvertise.getTitle());
                    existingAdvertise.setContent(updatedAdvertise.getContent());
                    existingAdvertise.setActive(updatedAdvertise.isActive());
                    // set other fields as needed
                    return repository.save(existingAdvertise);
                })
                .orElseThrow(() -> new RuntimeException("Advertise not found with id: " + id));
    }

    public List<Advertise> findFeaturedAdvertisements() {
        return repository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    public List<Advertise> findByCategory(String category) {
        return repository.findByCategoryAndIsActiveTrue(category);
    }
}