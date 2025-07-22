package com.peerly.repository;

import com.peerly.entity.Review;
import com.peerly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    // Find active reviews

    List<Review> findByRevieweeId(Long tutorId);

    List<Review> findByReviewerId(Long studentId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.reviewee.id = :tutorId")
    Double findAverageRatingByTutorId(Long tutorId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.reviewee.id = :tutorId")
    Long countByTutorId(Long tutorId);

    @Query("SELECT r FROM Review r WHERE r.reviewer.id = :userId AND r.rating > :i")
    List<Review> findReviewsAboveRating(@Param("userId") Long userId, @Param("i") int i);
}
