package com.peerly.controller;

import com.peerly.entity.Subtopic;
import com.peerly.service.SubtopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subtopics")
@CrossOrigin(origins = "*")
public class SubtopicController {

    @Autowired
    private SubtopicService subtopicService;

    /**
     * Get all active subtopics
     * @return List of active subtopics
     */
    @GetMapping
    public ResponseEntity<List<Subtopic>> getAllActiveSubtopics() {
        List<Subtopic> subtopics = subtopicService.getAllActiveSubtopics();
        return ResponseEntity.ok(subtopics);
    }

    /**
     * Get subtopic by ID
     * @param id Subtopic ID
     * @return Subtopic details
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getSubtopicById(@PathVariable Long id) {
        return subtopicService.getSubtopicById(id)
                .map(subtopic -> ResponseEntity.ok().body(subtopic))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Search subtopics by name
     * @param name Search term for subtopic name
     * @return List of matching subtopics
     */
    @GetMapping("/search")
    public ResponseEntity<List<Subtopic>> searchSubtopics(@RequestParam String name) {
        List<Subtopic> subtopics = subtopicService.searchSubtopicsByName(name);
        return ResponseEntity.ok(subtopics);
    }

    /**
     * Get subtopics by subject ID
     * @param subjectId Subject ID
     * @return List of subtopics for the subject
     */
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Subtopic>> getSubtopicsBySubjectId(@PathVariable Long subjectId) {
        List<Subtopic> subtopics = subtopicService.getSubtopicsBySubjectId(subjectId);
        return ResponseEntity.ok(subtopics);
    }

    /**
     * Get subtopics by tutor ID
     * @param tutorId Tutor ID
     * @return List of subtopics available to the tutor
     */
    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<Subtopic>> getSubtopicsByTutorId(@PathVariable Long tutorId) {
        List<Subtopic> subtopics = subtopicService.getSubtopicsByTutorId(tutorId);
        return ResponseEntity.ok(subtopics);
    }

    /**
     * Create a new subtopic
     * @param subtopic Subtopic to create
     * @return Created subtopic
     */
    @PostMapping
    public ResponseEntity<?> createSubtopic(@RequestBody Subtopic subtopic) {
        try {
            Subtopic createdSubtopic = subtopicService.createSubtopic(subtopic);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSubtopic);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to create subtopic: " + e.getMessage());
        }
    }

    /**
     * Update an existing subtopic
     * @param id Subtopic ID
     * @param subtopicDetails Updated subtopic details
     * @return Updated subtopic
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubtopic(@PathVariable Long id, @RequestBody Subtopic subtopicDetails) {
        try {
            Subtopic updatedSubtopic = subtopicService.updateSubtopic(id, subtopicDetails);
            return ResponseEntity.ok(updatedSubtopic);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to update subtopic: " + e.getMessage());
        }
    }
}
