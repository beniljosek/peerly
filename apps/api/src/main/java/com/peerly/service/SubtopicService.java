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
public class SubtopicService {
    
    @Autowired
    private SubtopicRepository subtopicRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    /**
     * Get all active subtopics
     * @return List of active subtopics
     */
    public List<Subtopic> getAllActiveSubtopics() {
        return subtopicRepository.findByIsActiveTrue();
    }
    
    /**
     * Get subtopic by ID
     * @param id Subtopic ID
     * @return Optional subtopic
     */
    public Optional<Subtopic> getSubtopicById(Long id) {
        return subtopicRepository.findById(id);
    }
    
    /**
     * Get subtopics by subject
     * @param subject Subject entity
     * @return List of subtopics for the subject
     */
    public List<Subtopic> getSubtopicsBySubject(Subject subject) {
        return subtopicRepository.findBySubjectAndIsActiveTrue(subject);
    }
    
    /**
     * Get subtopics by subject ID
     * @param subjectId Subject ID
     * @return List of subtopics for the subject
     */
    public List<Subtopic> getSubtopicsBySubjectId(Long subjectId) {
        return subtopicRepository.findBySubjectIdAndIsActiveTrue(subjectId);
    }
    
    /**
     * Search subtopics by name
     * @param name Search term for subtopic name
     * @return List of matching subtopics
     */
    public List<Subtopic> searchSubtopicsByName(String name) {
        return subtopicRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name);
    }
    
    /**
     * Get subtopics by tutor ID
     * @param tutorId Tutor ID
     * @return List of subtopics available to the tutor
     */
    public List<Subtopic> getSubtopicsByTutorId(Long tutorId) {
        return subtopicRepository.findByTutorId(tutorId);
    }
    
    /**
     * Create a new subtopic
     * @param subtopic Subtopic to create
     * @return Created subtopic
     */
    public Subtopic createSubtopic(Subtopic subtopic) {
        // Validate that the subject exists
        if (subtopic.getSubject() == null || subtopic.getSubject().getId() == null) {
            throw new RuntimeException("Subject is required for creating a subtopic");
        }
        
        Subject subject = subjectRepository.findById(subtopic.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + subtopic.getSubject().getId()));
        
        // Check if subtopic with same name already exists for this subject
        Optional<Subtopic> existing = subtopicRepository.findByNameIgnoreCaseAndSubject(subtopic.getName(), subject);
        if (existing.isPresent()) {
            throw new RuntimeException("Subtopic with name '" + subtopic.getName() + "' already exists for subject '" + subject.getName() + "'");
        }
        
        subtopic.setSubject(subject);
        return subtopicRepository.save(subtopic);
    }
    
    /**
     * Update an existing subtopic
     * @param id Subtopic ID
     * @param subtopicDetails Updated subtopic details
     * @return Updated subtopic
     */
    public Subtopic updateSubtopic(Long id, Subtopic subtopicDetails) {
        Subtopic subtopic = subtopicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subtopic not found with ID: " + id));
        
        subtopic.setName(subtopicDetails.getName());
        subtopic.setDescription(subtopicDetails.getDescription());
        subtopic.setIsActive(subtopicDetails.getIsActive());
        
        return subtopicRepository.save(subtopic);
    }
}
