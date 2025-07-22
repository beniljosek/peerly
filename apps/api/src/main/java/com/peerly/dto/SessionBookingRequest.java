package com.peerly.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionBookingRequest {
    
    private Long tutorId;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private LocalDateTime sessionDateTime;
    private Integer durationMinutes;
    private String subject;
    private String notes;
    private Long supercoinsAmount;
}
