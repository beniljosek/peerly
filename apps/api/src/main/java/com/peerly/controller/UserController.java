package com.peerly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<String> getProfile() {
        return ResponseEntity.ok("User profile endpoint");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody String userData) {
        return ResponseEntity.ok("User registration endpoint");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String credentials) {
        return ResponseEntity.ok("User login endpoint");
    }
} 