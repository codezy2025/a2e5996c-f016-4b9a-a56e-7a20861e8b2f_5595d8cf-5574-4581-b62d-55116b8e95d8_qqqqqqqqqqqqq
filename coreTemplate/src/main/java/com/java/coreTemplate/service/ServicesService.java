package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ServicesRepository;
import com.java.coreTemplate.model.dto.Services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ServicesService {

    private final ServicesRepository repository;

    public ServicesService(ServicesRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "services", allEntries = true)
    public Services save(Services entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "services", key = "#id")
    public Optional<Services> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("services")
    public List<Services> findAll() {
        return repository.findAll();
    }

    @Cacheable("services")
    public Page<Services> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Services> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "services", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "services", allEntries = true)
    public Services update(Services entity) {
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public long count() {
        return repository.count();
    }

    public List<Services> findByNameContaining(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}