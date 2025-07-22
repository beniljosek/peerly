package com.peerly.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column
    private String phone;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.STUDENT;
    
    // For tutor-specific fields
    @Column
    private Double hourlyRate;
    
    @Column
    private Integer experienceYears;
    
    // For student-specific fields
    @Column
    private String grade; // e.g., "10th Grade", "College Freshman", etc.
    
    // Supercoin system
    @Column(nullable = false)
    private Long supercoins = 0L;
    
    @Column
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    // Relationships
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "user_subjects",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private List<Subject> subjects = new ArrayList<>();
    
    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviewsGiven = new ArrayList<>();
    
    @OneToMany(mappedBy = "reviewee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviewsReceived = new ArrayList<>();
    
    // Helper methods
    public boolean isStudent() {
        return role == UserRole.STUDENT || role == UserRole.BOTH;
    }
    
    public boolean isTutor() {
        return role == UserRole.TUTOR || role == UserRole.BOTH;
    }
    
    public void creditSupercoins(Long amount) {
        if (amount > 0) {
            this.supercoins += amount;
        }
    }
    
    public void debitSupercoins(Long amount) throws InsufficientSupercoinsException {
        if (amount > this.supercoins) {
            throw new InsufficientSupercoinsException("Insufficient supercoins. Available: " + this.supercoins + ", Required: " + amount);
        }
        this.supercoins -= amount;
    }
    
    public enum UserRole {
        STUDENT,
        TUTOR,
        BOTH
    }
    
    public static class InsufficientSupercoinsException extends Exception {
        public InsufficientSupercoinsException(String message) {
            super(message);
        }
    }
}
