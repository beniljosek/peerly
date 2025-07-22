package com.peerly.service;

import com.peerly.entity.Subject;
import com.peerly.entity.Subtopic;
import com.peerly.repository.SubjectRepository;
import com.peerly.repository.SubtopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private SubtopicRepository subtopicRepository;
    
    /**
     * Get all active subjects
     * @return List of active subjects
     */
    public List<Subject> getAllActiveSubjects() {
        return subjectRepository.findByIsActiveTrue();
    }
    
    /**
     * Get subject by ID
     * @param id Subject ID
     * @return Optional subject
     */
    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }
    
    /**
     * Get subject by name (case-insensitive)
     * @param name Subject name
     * @return Optional subject
     */
    public Optional<Subject> getSubjectByName(String name) {
        return subjectRepository.findByNameIgnoreCase(name);
    }
    
    /**
     * Search subjects by name
     * @param name Search term for subject name
     * @return List of matching subjects
     */
    public List<Subject> searchSubjectsByName(String name) {
        return subjectRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name);
    }
    
    /**
     * Get subjects by tutor ID
     * @param tutorId Tutor ID
     * @return List of subjects taught by the tutor
     */
    public List<Subject> getSubjectsByTutorId(Long tutorId) {
        return subjectRepository.findByTutorId(tutorId);
    }
    
    /**
     * Create a new subject
     * @param subject Subject to create
     * @return Created subject
     */
    public Subject createSubject(Subject subject) {
        // Check if subject with same name already exists
        Optional<Subject> existing = subjectRepository.findByNameIgnoreCase(subject.getName());
        if (existing.isPresent()) {
            throw new RuntimeException("Subject with name '" + subject.getName() + "' already exists");
        }
        return subjectRepository.save(subject);
    }
    
    /**
     * Update an existing subject
     * @param id Subject ID
     * @param subjectDetails Updated subject details
     * @return Updated subject
     */
    public Subject updateSubject(Long id, Subject subjectDetails) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + id));
        
        subject.setName(subjectDetails.getName());
        subject.setDescription(subjectDetails.getDescription());
        subject.setIsActive(subjectDetails.getIsActive());
        
        return subjectRepository.save(subject);
    }
    
    /**
     * Get subtopics for a subject
     * @param subjectId Subject ID
     * @return List of subtopics
     */
    public List<Subtopic> getSubtopicsBySubjectId(Long subjectId) {
        return subtopicRepository.findBySubjectIdAndIsActiveTrue(subjectId);
    }
}
