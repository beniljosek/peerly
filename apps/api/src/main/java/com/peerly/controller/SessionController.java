package com.peerly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sessions")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class SessionController {

    @GetMapping
    public ResponseEntity<String> getSessions() {
        return ResponseEntity.ok("Get all sessions");
    }

    @PostMapping
    public ResponseEntity<String> createSession(@RequestBody String sessionData) {
        return ResponseEntity.ok("Create new session");
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getSession(@PathVariable String id) {
        return ResponseEntity.ok("Get session with id: " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSession(@PathVariable String id, @RequestBody String sessionData) {
        return ResponseEntity.ok("Update session with id: " + id);
    }
} 