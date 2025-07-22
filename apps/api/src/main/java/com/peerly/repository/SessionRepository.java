package com.peerly.repository;

import com.peerly.entity.Session;
import com.peerly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    
    // Find sessions by tutor (user acting as tutor)
    List<Session> findByTutor(User tutor);
    
    // Find sessions by student (user acting as student)
    List<Session> findByStudent(User student);
    
    // Find sessions by status
    List<Session> findByStatus(Session.SessionStatus status);
    
    // Find sessions by tutor and status
    List<Session> findByTutorAndStatus(User tutor, Session.SessionStatus status);
    
    // Find sessions by student and status
    List<Session> findByStudentAndStatus(User student, Session.SessionStatus status);
    
    // Check if tutor is available at a specific time
    @Query("SELECT COUNT(s) FROM Session s WHERE s.tutor = :tutor " +
           "AND s.sessionDateTime <= :endTime " +
           "AND FUNCTION('DATE_ADD', s.sessionDateTime, s.durationMinutes, 'MINUTE') >= :startTime " +
           "AND s.status IN ('PENDING', 'CONFIRMED')")
    Long countConflictingSessions(@Param("tutor") User tutor, 
                                 @Param("startTime") LocalDateTime startTime, 
                                 @Param("endTime") LocalDateTime endTime);
    
    // Find upcoming sessions for a tutor
    @Query("SELECT s FROM Session s WHERE s.tutor = :tutor " +
           "AND s.sessionDateTime > :now " +
           "AND s.status IN ('PENDING', 'CONFIRMED') " +
           "ORDER BY s.sessionDateTime ASC")
    List<Session> findUpcomingSessionsByTutor(@Param("tutor") User tutor, 
                                            @Param("now") LocalDateTime now);
    
    // Find upcoming sessions for a student
    @Query("SELECT s FROM Session s WHERE s.student = :student " +
           "AND s.sessionDateTime > :now " +
           "AND s.status IN ('PENDING', 'CONFIRMED') " +
           "ORDER BY s.sessionDateTime ASC")
    List<Session> findUpcomingSessionsByStudent(@Param("student") User student, 
                                              @Param("now") LocalDateTime now);
    
    // Search sessions by tutor name (case-insensitive)
    @Query("SELECT s FROM Session s WHERE LOWER(s.tutor.name) LIKE LOWER(CONCAT('%', :tutorName, '%'))")
    List<Session> findByTutorNameContainingIgnoreCase(@Param("tutorName") String tutorName);
    
    // Search sessions by subject/topic (case-insensitive)
    @Query("SELECT s FROM Session s WHERE LOWER(s.subject) LIKE LOWER(CONCAT('%', :subject, '%'))")
    List<Session> findBySubjectContainingIgnoreCase(@Param("subject") String subject);
    
    // Search sessions by tutor name OR subject (case-insensitive)
    @Query("SELECT s FROM Session s WHERE " +
           "LOWER(s.tutor.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.subject) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Session> findByTutorNameOrSubjectContainingIgnoreCase(@Param("searchTerm") String searchTerm);
    
    // Find sessions that need supercoin processing (completed but not processed)
    @Query("SELECT s FROM Session s WHERE s.status = 'COMPLETED' AND s.supercoinsProcessed = false")
    List<Session> findSessionsNeedingSupercoinsProcessing();
}