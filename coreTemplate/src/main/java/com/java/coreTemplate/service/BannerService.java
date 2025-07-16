package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.java.coreTemplate.repository.BannerRepository;
import com.java.coreTemplate.model.dto.Banner;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BannerService {

    private final BannerRepository repository;

    public BannerService(BannerRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "banners", allEntries = true)
    public Banner save(Banner entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "banners", key = "#id")
    public Optional<Banner> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("banners")
    public List<Banner> findAll() {
        return repository.findAll();
    }

    public Page<Banner> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Banner> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "banners", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "banners", allEntries = true)
    public Banner update(Long id, Banner updatedBanner) {
        return repository.findById(id)
                .map(existingBanner -> {
                    existingBanner.setTitle(updatedBanner.getTitle());
                    existingBanner.setContent(updatedBanner.getContent());
                    existingBanner.setActive(updatedBanner.isActive());
                    // Add other fields to update as needed
                    return repository.save(existingBanner);
                })
                .orElseThrow(() -> new RuntimeException("Banner not found with id: " + id));
    }

    public List<Banner> findByTitleContaining(String keyword) {
        return repository.findByTitleContainingIgnoreCase(keyword);
    }
}