package com.peerly.repository;

import com.peerly.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    
    // Find active subjects
    List<Subject> findByIsActiveTrue();
    
    // Find subject by name (case-insensitive)
    Optional<Subject> findByNameIgnoreCase(String name);
    
    // Search subjects by name containing (case-insensitive)
    List<Subject> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
    
    // Find subjects by tutor
    @Query("SELECT s FROM Subject s JOIN s.users t WHERE t.id = :tutorId AND s.isActive = true")
    List<Subject> findByTutorId(@Param("tutorId") Long tutorId);
}
