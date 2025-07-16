package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import com.java.coreTemplate.repository.NavbarRepository;
import com.java.coreTemplate.model.dto.Navbar;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class NavbarService {

    private final NavbarRepository repository;

    public NavbarService(NavbarRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "navbars", allEntries = true)
    public Navbar save(Navbar entity) {
        return repository.save(entity);
    }

    @Cacheable("navbars")
    public Optional<Navbar> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("navbars")
    public List<Navbar> findAll() {
        return repository.findAll();
    }

    @Cacheable("navbars")
    public List<Navbar> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "navbars", allEntries = true)
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "navbars", allEntries = true)
    public Navbar update(Long id, Navbar updatedEntity) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(updatedEntity.getName());
                    existing.setPath(updatedEntity.getPath());
                    existing.setIsActive(updatedEntity.getIsActive());
                    // add other fields as needed
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Navbar not found with id: " + id));
    }

    @Cacheable("navbars")
    public List<Navbar> findByParentId(Long parentId) {
        return repository.findByParentId(parentId);
    }

    @Cacheable("navbars")
    public List<Navbar> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}