package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.HomeRepository;
import com.java.coreTemplate.model.dto.Home;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HomeService {

    private final HomeRepository repository;

    @Transactional
    @CacheEvict(value = "homes", allEntries = true)
    public Home save(Home entity) {
        log.info("Saving home: {}", entity);
        return repository.save(entity);
    }

    @Cacheable(value = "homes", key = "#id")
    public Optional<Home> findById(Long id) {
        log.info("Fetching home by id: {}", id);
        return repository.findById(id);
    }

    @Transactional
    @CacheEvict(value = "homes", key = "#id")
    public void deleteById(Long id) {
        log.info("Deleting home by id: {}", id);
        repository.deleteById(id);
    }

    public Page<Home> findAll(Pageable pageable) {
        log.info("Fetching all homes with pagination");
        return repository.findAll(pageable);
    }

    public List<Home> findAllActive() {
        log.info("Fetching all active homes");
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "homes", key = "#root.methodName")
    public List<Home> findAllFeaturedHomes() {
        log.info("Fetching all featured homes");
        return repository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "homes", key = "#id")
    public Home updateHome(Long id, Home updatedHome) {
        log.info("Updating home with id: {}", id);
        return repository.findById(id)
                .map(existingHome -> {
                    existingHome.setAddress(updatedHome.getAddress());
                    existingHome.setActive(updatedHome.isActive());
                    // update other fields as needed
                    return repository.save(existingHome);
                })
                .orElseThrow(() -> new RuntimeException("Home not found with id: " + id));
    }
}