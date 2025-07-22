package com.peerly.repository;

import com.peerly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find active users
    List<User> findByIsActiveTrue();
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Find users by role
    List<User> findByRoleAndIsActiveTrue(User.UserRole role);
    
    // Find users by name (case-insensitive)
    List<User> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
    
    // Find tutors (role = TUTOR or BOTH)
    @Query("SELECT u FROM User u WHERE (u.role = 'TUTOR' OR u.role = 'BOTH') AND u.isActive = true")
    List<User> findActiveTutors();
    
    // Find students (role = STUDENT or BOTH)
    @Query("SELECT u FROM User u WHERE (u.role = 'STUDENT' OR u.role = 'BOTH') AND u.isActive = true")
    List<User> findActiveStudents();
    
    // Find tutors by subject name (through the many-to-many relationship)
    @Query("SELECT u FROM User u JOIN u.subjects s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :subjectName, '%')) AND (u.role = 'TUTOR' OR u.role = 'BOTH') AND u.isActive = true")
    List<User> findTutorsBySubjectNameContainingIgnoreCase(@Param("subjectName") String subjectName);
    
    // Find tutors by specific subject ID
    @Query("SELECT u FROM User u JOIN u.subjects s WHERE s.id = :subjectId AND (u.role = 'TUTOR' OR u.role = 'BOTH') AND u.isActive = true")
    List<User> findTutorsBySubjectId(@Param("subjectId") Long subjectId);
    
    // Find tutors ordered by experience
    @Query("SELECT u FROM User u WHERE (u.role = 'TUTOR' OR u.role = 'BOTH') AND u.isActive = true ORDER BY u.experienceYears DESC")
    List<User> findActiveTutorsOrderedByExperience();
    
    // Find users by grade (for students)
    List<User> findByGradeAndIsActiveTrue(String grade);
    
    // Find users with supercoins above threshold
    @Query("SELECT u FROM User u WHERE u.supercoins >= :minSupercoins AND u.isActive = true ORDER BY u.supercoins DESC")
    List<User> findUsersWithSupercoinsAbove(@Param("minSupercoins") Long minSupercoins);
    
    // Find users who have given reviews
    @Query("SELECT DISTINCT u FROM User u JOIN u.reviewsGiven r WHERE u.isActive = true")
    List<User> findUsersWithReviewsGiven();
    
    // Find users who have received reviews
    @Query("SELECT DISTINCT u FROM User u JOIN u.reviewsReceived r WHERE u.isActive = true")
    List<User> findUsersWithReviewsReceived();
    
    // Find tutors who teach multiple subjects
    @Query("SELECT u FROM User u WHERE (u.role = 'TUTOR' OR u.role = 'BOTH') AND u.isActive = true AND SIZE(u.subjects) > 1")
    List<User> findTutorsWithMultipleSubjects();
}
