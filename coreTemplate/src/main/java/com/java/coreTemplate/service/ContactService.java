package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ContactRepository;
import com.java.coreTemplate.model.dto.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Contact create(Contact entity) {
        return repository.save(entity);
    }

    @Transactional
    public Contact update(Contact entity) {
        return repository.save(entity);
    }

    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Optional<Contact> findById(Long id) {
        return repository.findById(id);
    }

    public List<Contact> findAll() {
        return repository.findAll();
    }

    public Page<Contact> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Contact> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    public Page<Contact> findAllActive(Pageable pageable) {
        return repository.findByIsActiveTrue(pageable);
    }

    public List<Contact> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public Optional<Contact> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Transactional
    public void deactivate(Long id) {
        repository.findById(id).ifPresent(contact -> {
            contact.setActive(false);
            repository.save(contact);
        });
    }

    @Transactional
    public void activate(Long id) {
        repository.findById(id).ifPresent(contact -> {
            contact.setActive(true);
            repository.save(contact);
        });
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }
}