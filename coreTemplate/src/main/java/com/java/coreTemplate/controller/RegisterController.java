package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import com.java.coreTemplate.service.RegisterService;
import com.java.coreTemplate.model.dto.Register;

@RestController
@RequestMapping("/api/v1/register")
public class RegisterController {
    private final RegisterService service;

    public RegisterController(RegisterService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Register> create(@RequestBody Register entity) {
        Register savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Register> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Register>> getAll(Pageable pageable) {
        Page<Register> registers = service.findAll(pageable);
        return ResponseEntity.ok(registers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Register> update(@PathVariable Long id, @RequestBody Register entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id); // Ensure the ID matches the path variable
        Register updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
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
    public ResponseEntity<Page<Register>> search(
            @RequestParam(required = false) String query,
            Pageable pageable) {
        Page<Register> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}