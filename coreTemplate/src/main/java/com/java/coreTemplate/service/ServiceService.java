package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ServiceRepository;
import com.java.coreTemplate.model.dto.Service;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ServiceService {
    private final ServiceRepository repository;

    public ServiceService(ServiceRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "services", allEntries = true)
    public Service save(Service entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "services", key = "#id")
    public Optional<Service> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("services")
    public List<Service> findAll() {
        return repository.findAll();
    }

    @Transactional
    @CacheEvict(value = "services", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<Service> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Service> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public List<Service> findByNameContaining(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    @Transactional
    @CacheEvict(value = "services", key = "#id")
    public Service update(Long id, Service updatedEntity) {
        return repository.findById(id)
                .map(existingEntity -> {
                    // Update fields here
                    existingEntity.setName(updatedEntity.getName());
                    existingEntity.setActive(updatedEntity.isActive());
                    // Add other fields as needed
                    return repository.save(existingEntity);
                })
                .orElseThrow(() -> new EntityNotFoundException("Service not found with id: " + id));
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}