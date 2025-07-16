package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.NavbarService;
import com.java.coreTemplate.model.dto.Navbar;

@RestController
@RequestMapping("/api/v1/navbar")
public class NavbarController {
    private final NavbarService service;
    
    public NavbarController(NavbarService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Navbar> create(@RequestBody Navbar entity) {
        Navbar savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/navbar/" + savedEntity.getId())
                .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Navbar> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Navbar>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Navbar> update(
            @PathVariable Long id, 
            @RequestBody Navbar entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Navbar> partialUpdate(
            @PathVariable Long id,
            @RequestBody Navbar partialEntity) {
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
    public ResponseEntity<Page<Navbar>> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Boolean isActive,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(title, isActive, pageable));
    }
}