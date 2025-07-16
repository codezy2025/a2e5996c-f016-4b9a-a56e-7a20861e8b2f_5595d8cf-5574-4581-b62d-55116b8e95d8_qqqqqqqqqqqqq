package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.BannerService;
import com.java.coreTemplate.model.dto.Banner;

@RestController
@RequestMapping("/api/v1/banners")
public class BannerController {
    private final BannerService service;
    
    public BannerController(BannerService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Banner> create(@RequestBody Banner entity) {
        Banner savedBanner = service.save(entity);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .header("Location", "/api/v1/banners/" + savedBanner.getId())
            .body(savedBanner);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Banner> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Banner>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Banner> update(
            @PathVariable Long id, 
            @RequestBody Banner entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Banner> partialUpdate(
            @PathVariable Long id,
            @RequestBody Banner partialEntity) {
        return service.findById(id)
            .map(existing -> {
                if (partialEntity.getTitle() != null) {
                    existing.setTitle(partialEntity.getTitle());
                }
                // Add other fields to update as needed
                return ResponseEntity.ok(service.save(existing));
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
    public ResponseEntity<Page<Banner>> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Boolean active,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(title, active, pageable));
    }
}