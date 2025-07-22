package com.peerly.controller;

import com.peerly.entity.Review;
import com.peerly.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    /**
     * Get review by ID
     * @param id Review ID
     * @return Review details
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id)
                .map(review -> ResponseEntity.ok().body(review))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get reviews for a tutor
     * @param tutorId Tutor ID
     * @return List of reviews for the tutor
     */
    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<Review>> getReviewsForTutor(@PathVariable Long tutorId) {
        List<Review> reviews = reviewService.getReviewsForTutor(tutorId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * Get reviews by a student
     * @param studentId Student ID
     * @return List of reviews by the student
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Review>> getReviewsByStudent(@PathVariable Long studentId) {
        List<Review> reviews = reviewService.getReviewsByStudent(studentId);
        return ResponseEntity.ok(reviews);
    }



    /**
     * Get tutor rating statistics
     * @param tutorId Tutor ID
     * @return Rating statistics (average rating, review count)
     */
    @GetMapping("/tutor/{tutorId}/stats")
    public ResponseEntity<Map<String, Object>> getTutorRatingStats(@PathVariable Long tutorId) {
        Double averageRating = reviewService.getAverageRatingForTutor(tutorId);
        Long reviewCount = reviewService.getReviewCountForTutor(tutorId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", averageRating);
        stats.put("reviewCount", reviewCount);
        stats.put("tutorId", tutorId);
        
        return ResponseEntity.ok(stats);
    }



    /**
     * Create a new review
     * @param review Review to create
     * @return Created review
     */
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        try {
            Review createdReview = reviewService.createReview(review);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to create review: " + e.getMessage());
        }
    }

    /**
     * Update an existing review
     * @param id Review ID
     * @param reviewDetails Updated review details
     * @return Updated review
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        try {
            Review updatedReview = reviewService.updateReview(id, reviewDetails);
            return ResponseEntity.ok(updatedReview);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to update review: " + e.getMessage());
        }
    }

    /**
     * Delete a review (soft delete)
     * @param id Review ID
     * @return Success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
            return ResponseEntity.ok().body("Review deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to delete review: " + e.getMessage());
        }
    }
}
