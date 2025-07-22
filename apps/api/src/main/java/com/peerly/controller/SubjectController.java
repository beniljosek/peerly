package com.peerly.controller;

import com.peerly.entity.Subject;
import com.peerly.entity.Subtopic;
import com.peerly.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    /**
     * Get all active subjects
     * @return List of active subjects
     */
    @GetMapping
    public ResponseEntity<List<Subject>> getAllActiveSubjects() {
        List<Subject> subjects = subjectService.getAllActiveSubjects();
        return ResponseEntity.ok(subjects);
    }

    /**
     * Get subject by ID
     * @param id Subject ID
     * @return Subject details
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id)
                .map(subject -> ResponseEntity.ok().body(subject))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Search subjects by name
     * @param name Search term for subject name
     * @return List of matching subjects
     */
    @GetMapping("/search")
    public ResponseEntity<List<Subject>> searchSubjects(@RequestParam String name) {
        List<Subject> subjects = subjectService.searchSubjectsByName(name);
        return ResponseEntity.ok(subjects);
    }

    /**
     * Get subjects by tutor ID
     * @param tutorId Tutor ID
     * @return List of subjects taught by the tutor
     */
    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<Subject>> getSubjectsByTutorId(@PathVariable Long tutorId) {
        List<Subject> subjects = subjectService.getSubjectsByTutorId(tutorId);
        return ResponseEntity.ok(subjects);
    }

    /**
     * Get subtopics for a subject
     * @param subjectId Subject ID
     * @return List of subtopics
     */
    @GetMapping("/{subjectId}/subtopics")
    public ResponseEntity<List<Subtopic>> getSubtopicsBySubjectId(@PathVariable Long subjectId) {
        List<Subtopic> subtopics = subjectService.getSubtopicsBySubjectId(subjectId);
        return ResponseEntity.ok(subtopics);
    }

    /**
     * Create a new subject
     * @param subject Subject to create
     * @return Created subject
     */
    @PostMapping
    public ResponseEntity<?> createSubject(@RequestBody Subject subject) {
        try {
            Subject createdSubject = subjectService.createSubject(subject);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSubject);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to create subject: " + e.getMessage());
        }
    }

    /**
     * Update an existing subject
     * @param id Subject ID
     * @param subjectDetails Updated subject details
     * @return Updated subject
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody Subject subjectDetails) {
        try {
            Subject updatedSubject = subjectService.updateSubject(id, subjectDetails);
            return ResponseEntity.ok(updatedSubject);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to update subject: " + e.getMessage());
        }
    }
}
