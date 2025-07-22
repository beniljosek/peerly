package com.peerly.service;

import com.peerly.entity.Review;
import com.peerly.entity.User;
import com.peerly.repository.ReviewRepository;
import com.peerly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private UserRepository userRepository;
    

    
    /**
     * Get review by ID
     * @param id Review ID
     * @return Optional review
     */
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }




    /**
     * Create a new review
     * @param review Review to create
     * @return Created review
     */
    public Review createReview(Review review) {
        // Validate reviewer exists
        if (review.getReviewer() == null || review.getReviewer().getId() == null) {
            throw new RuntimeException("Reviewer is required for creating a review");
        }
        
        User reviewer = userRepository.findById(review.getReviewer().getId())
                .orElseThrow(() -> new RuntimeException("Reviewer not found with ID: " + review.getReviewer().getId()));
        
        // Validate reviewee exists
        if (review.getReviewee() == null || review.getReviewee().getId() == null) {
            throw new RuntimeException("Reviewee is required for creating a review");
        }
        
        User reviewee = userRepository.findById(review.getReviewee().getId())
                .orElseThrow(() -> new RuntimeException("Reviewee not found with ID: " + review.getReviewee().getId()));
        
        // Validate that reviewer is a student (or both)
        if (!reviewer.isStudent()) {
            throw new RuntimeException("Only students can give reviews");
        }
        
        // Validate that reviewee is a tutor (or both)
        if (!reviewee.isTutor()) {
            throw new RuntimeException("Reviews can only be given to tutors");
        }

        
        // Validate rating
        if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        
        return reviewRepository.save(review);
    }
    
    /**
     * Update an existing review
     * @param id Review ID
     * @param reviewDetails Updated review details
     * @return Updated review
     */
    public Review updateReview(Long id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + id));
        
        // Validate rating
        if (reviewDetails.getRating() != null && (reviewDetails.getRating() < 1 || reviewDetails.getRating() > 5)) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        
        if (reviewDetails.getRating() != null) {
            review.setRating(reviewDetails.getRating());
        }
        if (reviewDetails.getComment() != null) {
            review.setComment(reviewDetails.getComment());
        }
        if (reviewDetails.getSubject() != null) {
            review.setSubject(reviewDetails.getSubject());
        }
        
        review.setUpdatedAt(LocalDateTime.now());
        
        return reviewRepository.save(review);
    }
    
    /**
     * Delete a review (soft delete by setting isActive to false)
     * @param id Review ID
     * @return Updated review
     */
    public Review deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + id));
        
        review.setIsActive(false);
        review.setUpdatedAt(LocalDateTime.now());
        
        return reviewRepository.save(review);
    }
    
    /**
     * Get high-rated reviews for a user (4+ stars)
     * @param userId User ID
     * @return List of high-rated reviews
     */
    public List<Review> getHighRatedReviewsForUser(Long userId) {
        return reviewRepository.findReviewsAboveRating(userId, 4);
    }

    public List<Review> getReviewsForTutor(Long tutorId) {
        return reviewRepository.findByRevieweeId(tutorId);
    }

    public List<Review> getReviewsByStudent(Long studentId) {
        return reviewRepository.findByReviewerId(studentId);
    }

    public Double getAverageRatingForTutor(Long tutorId) {
        return reviewRepository.findAverageRatingByTutorId(tutorId);
    }

    public Long getReviewCountForTutor(Long tutorId) {
        return reviewRepository.countByTutorId(tutorId);
    }
}
