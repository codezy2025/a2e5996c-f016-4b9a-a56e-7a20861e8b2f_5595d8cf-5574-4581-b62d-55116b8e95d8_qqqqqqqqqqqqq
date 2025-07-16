package com.java.coreTemplate.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.java.coreTemplate.service.ServiceService;
import com.java.coreTemplate.model.dto.Service;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/service")
public class ServiceController {
    private final ServiceService service;
    
    public ServiceController(ServiceService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Service> create(@RequestBody Service entity) {
        Service createdService = service.save(entity);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(createdService.getId())
            .toUri();
        return ResponseEntity.created(location).body(createdService);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Service> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Service>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Service> update(
            @PathVariable Long id, 
            @RequestBody Service entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Service> partialUpdate(
            @PathVariable Long id,
            @RequestBody Service partialEntity) {
        return service.partialUpdate(id, partialEntity)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<Service>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(name, description, pageable));
    }
}