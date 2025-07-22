package com.peerly.repository;

import com.peerly.entity.Subtopic;
import com.peerly.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubtopicRepository extends JpaRepository<Subtopic, Long> {
    
    // Find active subtopics
    List<Subtopic> findByIsActiveTrue();
    
    // Find subtopics by subject
    List<Subtopic> findBySubjectAndIsActiveTrue(Subject subject);
    
    // Find subtopics by subject ID
    List<Subtopic> findBySubjectIdAndIsActiveTrue(Long subjectId);
    
    // Find subtopic by name and subject (case-insensitive)
    Optional<Subtopic> findByNameIgnoreCaseAndSubject(String name, Subject subject);
    
    // Search subtopics by name containing (case-insensitive)
    List<Subtopic> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
    
    // Find subtopics by tutor (through subject relationship)
    @Query("SELECT st FROM Subtopic st JOIN st.subject s JOIN s.users t WHERE t.id = :tutorId AND st.isActive = true")
    List<Subtopic> findByTutorId(@Param("tutorId") Long tutorId);
}
