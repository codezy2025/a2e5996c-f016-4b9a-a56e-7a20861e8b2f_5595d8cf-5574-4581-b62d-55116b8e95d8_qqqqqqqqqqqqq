package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.AdvertiseService;
import com.java.coreTemplate.model.dto.Advertise;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/v1/advertise")
public class AdvertiseController {
    private final AdvertiseService service;

    public AdvertiseController(AdvertiseService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Advertise> create(@RequestBody Advertise entity) {
        Advertise savedAdvertise = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdvertise);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Advertise> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Advertise>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        Page<Advertise> advertises = service.findAll(pageable);
        return ResponseEntity.ok(advertises);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Advertise> update(
            @PathVariable Long id, 
            @RequestBody Advertise entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Advertise updatedAdvertise = service.save(entity);
        return ResponseEntity.ok(updatedAdvertise);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Advertise> partialUpdate(
            @PathVariable Long id,
            @RequestBody Advertise partialEntity) {
        return service.findById(id)
            .map(existingAdvertise -> {
                if (partialEntity.getTitle() != null) {
                    existingAdvertise.setTitle(partialEntity.getTitle());
                }
                if (partialEntity.getDescription() != null) {
                    existingAdvertise.setDescription(partialEntity.getDescription());
                }
                // Add other fields as needed
                Advertise updated = service.save(existingAdvertise);
                return ResponseEntity.ok(updated);
            })
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
    public ResponseEntity<Page<Advertise>> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String category,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Advertise> results = service.search(title, category, pageable);
        return ResponseEntity.ok(results);
    }
}