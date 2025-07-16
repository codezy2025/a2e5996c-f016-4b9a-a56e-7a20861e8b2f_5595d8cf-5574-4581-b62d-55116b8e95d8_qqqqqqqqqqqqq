package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.HomeService;
import com.java.coreTemplate.model.dto.Home;

@RestController
@RequestMapping("/api/v1/homes")
public class HomeController {
    private final HomeService service;

    public HomeController(HomeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Home> create(@RequestBody Home entity) {
        Home savedEntity = service.save(entity);
        return ResponseEntity
                .created(URI.create("/api/v1/homes/" + savedEntity.getId()))
                .body(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Home> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Home>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Home> update(
            @PathVariable Long id,
            @RequestBody Home entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Home> partialUpdate(
            @PathVariable Long id,
            @RequestBody Home partialEntity) {
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
    public ResponseEntity<Page<Home>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}