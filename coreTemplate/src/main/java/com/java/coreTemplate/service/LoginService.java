package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.LoginRepository;
import com.java.coreTemplate.model.dto.Login;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class LoginService {

    private final LoginRepository repository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(LoginRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @CacheEvict(value = "logins", allEntries = true)
    public Login save(Login entity) {
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        return repository.save(entity);
    }

    @Cacheable(value = "logins", key = "#id")
    public Optional<Login> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable("logins")
    public List<Login> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "logins", key = "#id")
    public void deactivateLogin(Long id) {
        repository.findById(id).ifPresent(login -> {
            login.setActive(false);
            repository.save(login);
        });
    }

    public Page<Login> findAllPaginated(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Transactional
    @CacheEvict(value = "logins", key = "#id")
    public Optional<Login> updateLogin(Long id, Login updatedLogin) {
        return repository.findById(id).map(existingLogin -> {
            existingLogin.setUsername(updatedLogin.getUsername());
            if (updatedLogin.getPassword() != null) {
                existingLogin.setPassword(passwordEncoder.encode(updatedLogin.getPassword()));
            }
            existingLogin.setActive(updatedLogin.isActive());
            return repository.save(existingLogin);
        });
    }

    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }
}