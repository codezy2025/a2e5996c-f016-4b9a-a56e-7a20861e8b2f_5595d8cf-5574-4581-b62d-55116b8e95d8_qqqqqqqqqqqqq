package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.ContactService;
import com.java.coreTemplate.model.dto.Contact;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {
    private final ContactService service;
    
    public ContactController(ContactService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Contact> create(@Valid @RequestBody Contact entity) {
        Contact savedContact = service.save(entity);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedContact);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Contact>> getAll(
            @PageableDefault(size = 20, sort = "name") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(
            @PathVariable Long id, 
            @Valid @RequestBody Contact entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Contact> partialUpdate(
            @PathVariable Long id,
            @RequestBody Contact partialEntity) {
        return service.partialUpdate(id, partialEntity)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<Contact>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(name, email, pageable));
    }
}