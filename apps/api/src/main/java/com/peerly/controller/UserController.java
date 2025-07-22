package com.peerly.controller;

import com.peerly.entity.User;
import com.peerly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get all active users
     * @return List of active users
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllActiveUsers() {
        List<User> users = userService.getAllActiveUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Get user by ID
     * @param id User ID
     * @return User details
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get user by email
     * @param email User email
     * @return User details
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get all active tutors
     * @return List of active tutors
     */
    @GetMapping("/tutors")
    public ResponseEntity<List<User>> getAllActiveTutors() {
        List<User> tutors = userService.getAllActiveTutors();
        return ResponseEntity.ok(tutors);
    }

    /**
     * Get all active students
     * @return List of active students
     */
    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllActiveStudents() {
        List<User> students = userService.getAllActiveStudents();
        return ResponseEntity.ok(students);
    }

    /**
     * Search users by name
     * @param name Search term for user name
     * @return List of matching users
     */
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String name) {
        List<User> users = userService.searchUsersByName(name);
        return ResponseEntity.ok(users);
    }

    /**
     * Get tutors by subject
     * @param subject Subject name
     * @return List of tutors teaching the subject
     */
    @GetMapping("/tutors/subject")
    public ResponseEntity<List<User>> getTutorsBySubject(@RequestParam String subject) {
        List<User> tutors = userService.getTutorsBySubject(subject);
        return ResponseEntity.ok(tutors);
    }

    /**
     * Get tutors ordered by experience
     * @return List of tutors ordered by experience years
     */
    @GetMapping("/tutors/by-experience")
    public ResponseEntity<List<User>> getTutorsOrderedByExperience() {
        List<User> tutors = userService.getTutorsOrderedByExperience();
        return ResponseEntity.ok(tutors);
    }

    /**
     * Get students by grade
     * @param grade Student grade
     * @return List of students in the grade
     */
    @GetMapping("/students/grade/{grade}")
    public ResponseEntity<List<User>> getStudentsByGrade(@PathVariable String grade) {
        List<User> students = userService.getStudentsByGrade(grade);
        return ResponseEntity.ok(students);
    }

    /**
     * Get users with supercoins above threshold
     * @param minSupercoins Minimum supercoins threshold
     * @return List of users with supercoins above threshold
     */
    @GetMapping("/supercoins")
    public ResponseEntity<List<User>> getUsersWithSupercoinsAbove(@RequestParam Long minSupercoins) {
        List<User> users = userService.getUsersWithSupercoinsAbove(minSupercoins);
        return ResponseEntity.ok(users);
    }

    /**
     * Get users who have given reviews
     * @return List of users with reviews given
     */
    @GetMapping("/with-reviews-given")
    public ResponseEntity<List<User>> getUsersWithReviewsGiven() {
        List<User> users = userService.getUsersWithReviewsGiven();
        return ResponseEntity.ok(users);
    }

    /**
     * Get users who have received reviews
     * @return List of users with reviews received
     */
    @GetMapping("/with-reviews-received")
    public ResponseEntity<List<User>> getUsersWithReviewsReceived() {
        List<User> users = userService.getUsersWithReviewsReceived();
        return ResponseEntity.ok(users);
    }

    /**
     * Create a new user
     * @param user User to create
     * @return Created user
     */
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to create user: " + e.getMessage());
        }
    }

    /**
     * Update an existing user
     * @param id User ID
     * @param userDetails Updated user details
     * @return Updated user
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to update user: " + e.getMessage());
        }
    }

    /**
     * Credit supercoins to a user
     * @param id User ID
     * @param amount Amount to credit
     * @return Updated user
     */
    @PostMapping("/{id}/supercoins/credit")
    public ResponseEntity<?> creditSupercoins(@PathVariable Long id, @RequestParam Long amount) {
        try {
            User updatedUser = userService.creditSupercoins(id, amount);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to credit supercoins: " + e.getMessage());
        }
    }

    /**
     * Debit supercoins from a user
     * @param id User ID
     * @param amount Amount to debit
     * @return Updated user
     */
    @PostMapping("/{id}/supercoins/debit")
    public ResponseEntity<?> debitSupercoins(@PathVariable Long id, @RequestParam Long amount) {
        try {
            User updatedUser = userService.debitSupercoins(id, amount);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to debit supercoins: " + e.getMessage());
        }
    }

    /**
     * Transfer supercoins between users
     * @param fromUserId Source user ID
     * @param toUserId Destination user ID
     * @param amount Amount to transfer
     * @return Transfer result
     */
    @PostMapping("/supercoins/transfer")
    public ResponseEntity<?> transferSupercoins(@RequestParam Long fromUserId, 
                                              @RequestParam Long toUserId, 
                                              @RequestParam Long amount) {
        try {
            User[] result = userService.transferSupercoins(fromUserId, toUserId, amount);
            Map<String, Object> response = new HashMap<>();
            response.put("fromUser", result[0]);
            response.put("toUser", result[1]);
            response.put("transferredAmount", amount);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to transfer supercoins: " + e.getMessage());
        }
    }

    /**
     * Deactivate a user
     * @param id User ID
     * @return Updated user
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        try {
            User deactivatedUser = userService.deactivateUser(id);
            return ResponseEntity.ok(deactivatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to deactivate user: " + e.getMessage());
        }
    }
}
