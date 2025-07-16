package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.RegisterRepository;
import com.java.coreTemplate.model.dto.Register;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class RegisterService {

    private final RegisterRepository repository;

    public RegisterService(RegisterRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "registers", allEntries = true)
    public Register save(Register entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "registers", key = "#id")
    public Optional<Register> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("registers")
    public List<Register> findAll() {
        return repository.findAll();
    }

    public Page<Register> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Register> findAll(Specification<Register> spec, Pageable pageable) {
        return repository.findAll(spec, pageable);
    }

    @Transactional
    @CacheEvict(value = "registers", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Cacheable(value = "registers", key = "'active'")
    public List<Register> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Cacheable(value = "registers", key = "#email")
    public Optional<Register> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Transactional
    @CacheEvict(value = "registers", key = "#id")
    public Register update(Long id, Register updatedEntity) {
        return repository.findById(id)
                .map(existing -> {
                    // Update fields here
                    existing.setName(updatedEntity.getName());
                    existing.setEmail(updatedEntity.getEmail());
                    // ... other fields
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Register not found with id: " + id));
    }
}