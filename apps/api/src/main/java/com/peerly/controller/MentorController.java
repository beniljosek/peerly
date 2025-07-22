package com.peerly.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mentors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class MentorController {

    @GetMapping
    public ResponseEntity<String> getMentors() {
        return ResponseEntity.ok("Get all mentors");
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getMentor(@PathVariable String id) {
        return ResponseEntity.ok("Get mentor with id: " + id);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyMentor(@RequestBody String verificationData) {
        return ResponseEntity.ok("Verify mentor skills");
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<String> updateAvailability(@PathVariable String id, @RequestBody String availabilityData) {
        return ResponseEntity.ok("Update mentor availability");
    }
} 