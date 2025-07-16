package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.ServicesService;
import com.java.coreTemplate.model.dto.Services;

@RestController
@RequestMapping("/api/v1/services")
public class ServicesController {
    private final ServicesService service;

    public ServicesController(ServicesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Services> create(@RequestBody Services entity) {
        Services createdService = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdService);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Services> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Services>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<Services> servicesPage = service.findAll(pageable);
        return ResponseEntity.ok(servicesPage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Services> update(
            @PathVariable Long id, 
            @RequestBody Services entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Services updatedService = service.save(entity);
        return ResponseEntity.ok(updatedService);
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
    public ResponseEntity<Page<Services>> search(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Services> results = service.searchByName(name, pageable);
        return ResponseEntity.ok(results);
    }
}