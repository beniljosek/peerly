package com.peerly.service;

import com.peerly.entity.User;
import com.peerly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Get all active users
     * @return List of active users
     */
    public List<User> getAllActiveUsers() {
        return userRepository.findByIsActiveTrue();
    }
    
    /**
     * Get user by ID
     * @param id User ID
     * @return Optional user
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    /**
     * Get user by email
     * @param email User email
     * @return Optional user
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Get all active tutors
     * @return List of active tutors
     */
    public List<User> getAllActiveTutors() {
        return userRepository.findActiveTutors();
    }
    
    /**
     * Get all active students
     * @return List of active students
     */
    public List<User> getAllActiveStudents() {
        return userRepository.findActiveStudents();
    }
    
    /**
     * Search users by name
     * @param name Search term for user name
     * @return List of matching users
     */
    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name);
    }
    
    /**
     * Get tutors by subject name
     * @param subject Subject name
     * @return List of tutors teaching the subject
     */
    public List<User> getTutorsBySubject(String subject) {
        return userRepository.findTutorsBySubjectNameContainingIgnoreCase(subject);
    }
    
    /**
     * Get tutors by subject ID
     * @param subjectId Subject ID
     * @return List of tutors teaching the subject
     */
    public List<User> getTutorsBySubjectId(Long subjectId) {
        return userRepository.findTutorsBySubjectId(subjectId);
    }
    
    /**
     * Get tutors ordered by experience
     * @return List of tutors ordered by experience years
     */
    public List<User> getTutorsOrderedByExperience() {
        return userRepository.findActiveTutorsOrderedByExperience();
    }
    
    /**
     * Get students by grade
     * @param grade Student grade
     * @return List of students in the grade
     */
    public List<User> getStudentsByGrade(String grade) {
        return userRepository.findByGradeAndIsActiveTrue(grade);
    }
    
    /**
     * Get users with supercoins above threshold
     * @param minSupercoins Minimum supercoins threshold
     * @return List of users with supercoins above threshold
     */
    public List<User> getUsersWithSupercoinsAbove(Long minSupercoins) {
        return userRepository.findUsersWithSupercoinsAbove(minSupercoins);
    }
    
    /**
     * Get users who have given reviews
     * @return List of users with reviews given
     */
    public List<User> getUsersWithReviewsGiven() {
        return userRepository.findUsersWithReviewsGiven();
    }
    
    /**
     * Get users who have received reviews
     * @return List of users with reviews received
     */
    public List<User> getUsersWithReviewsReceived() {
        return userRepository.findUsersWithReviewsReceived();
    }
    
    /**
     * Create a new user
     * @param user User to create
     * @return Created user
     */
    public User createUser(User user) {
        // Check if user with same email already exists
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("User with email '" + user.getEmail() + "' already exists");
        }
        
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        // Initialize supercoins if not set
        if (user.getSupercoins() == null) {
            user.setSupercoins(0L);
        }
        
        return userRepository.save(user);
    }
    
    /**
     * Update an existing user
     * @param id User ID
     * @param userDetails Updated user details
     * @return Updated user
     */
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        
        user.setName(userDetails.getName());
        user.setPhone(userDetails.getPhone());
        user.setBio(userDetails.getBio());
        user.setRole(userDetails.getRole());
        user.setHourlyRate(userDetails.getHourlyRate());
        user.setExperienceYears(userDetails.getExperienceYears());
        user.setGrade(userDetails.getGrade());
        user.setIsActive(userDetails.getIsActive());
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }
    
    /**
     * Credit supercoins to a user
     * @param userId User ID
     * @param amount Amount to credit
     * @return Updated user
     */
    public User creditSupercoins(Long userId, Long amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        if (amount <= 0) {
            throw new RuntimeException("Credit amount must be positive");
        }
        
        user.creditSupercoins(amount);
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }
    
    /**
     * Debit supercoins from a user
     * @param userId User ID
     * @param amount Amount to debit
     * @return Updated user
     */
    public User debitSupercoins(Long userId, Long amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        if (amount <= 0) {
            throw new RuntimeException("Debit amount must be positive");
        }
        
        try {
            user.debitSupercoins(amount);
            user.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(user);
        } catch (User.InsufficientSupercoinsException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    
    /**
     * Transfer supercoins between users
     * @param fromUserId Source user ID
     * @param toUserId Destination user ID
     * @param amount Amount to transfer
     * @return Array containing [fromUser, toUser] after transfer
     */
    public User[] transferSupercoins(Long fromUserId, Long toUserId, Long amount) {
        User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new RuntimeException("Source user not found with ID: " + fromUserId));
        
        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new RuntimeException("Destination user not found with ID: " + toUserId));
        
        if (amount <= 0) {
            throw new RuntimeException("Transfer amount must be positive");
        }
        
        try {
            fromUser.debitSupercoins(amount);
            toUser.creditSupercoins(amount);
            
            fromUser.setUpdatedAt(LocalDateTime.now());
            toUser.setUpdatedAt(LocalDateTime.now());
            
            User updatedFromUser = userRepository.save(fromUser);
            User updatedToUser = userRepository.save(toUser);
            
            return new User[]{updatedFromUser, updatedToUser};
        } catch (User.InsufficientSupercoinsException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    
    /**
     * Deactivate a user
     * @param id User ID
     * @return Updated user
     */
    public User deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        
        user.setIsActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }
}
