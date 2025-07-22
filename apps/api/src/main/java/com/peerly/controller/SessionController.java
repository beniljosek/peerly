package com.peerly.controller;

import com.peerly.dto.SessionBookingRequest;
import com.peerly.entity.Session;
import com.peerly.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    /**
     * Book a new session
     * @param request Session booking request
     * @return Booked session details
     */
    @PostMapping("/book")
    public ResponseEntity<?> bookSession(@RequestBody SessionBookingRequest request) {
        try {
            Session bookedSession = sessionService.bookSession(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(bookedSession);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Booking failed: " + e.getMessage());
        }
    }

    /**
     * Accept a session request (for tutors)
     * @param sessionId Session ID to accept
     * @param tutorId Tutor ID for validation
     * @return Updated session with CONFIRMED status
     */
    @PutMapping("/{sessionId}/accept")
    public ResponseEntity<?> acceptSessionRequest(@PathVariable Long sessionId, 
                                                @RequestParam Long tutorId) {
        try {
            Session acceptedSession = sessionService.acceptSessionRequest(sessionId, tutorId);
            return ResponseEntity.ok(acceptedSession);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to accept session: " + e.getMessage());
        }
    }

    /**
     * Reject a session request (for tutors)
     * @param sessionId Session ID to reject
     * @param tutorId Tutor ID for validation
     * @return Updated session with CANCELLED status
     */
    @PutMapping("/{sessionId}/reject")
    public ResponseEntity<?> rejectSessionRequest(@PathVariable Long sessionId, 
                                                @RequestParam Long tutorId) {
        try {
            Session rejectedSession = sessionService.rejectSessionRequest(sessionId, tutorId);
            return ResponseEntity.ok(rejectedSession);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to reject session: " + e.getMessage());
        }
    }

    /**
     * Get pending sessions for a tutor (sessions awaiting response)
     * @param tutorId Tutor's ID
     * @return List of pending sessions
     */
    @GetMapping("/tutor/{tutorId}/pending")
    public ResponseEntity<?> getPendingSessionsForTutor(@PathVariable Long tutorId) {
        try {
            List<Session> pendingSessions = sessionService.getPendingSessionsForTutor(tutorId);
            return ResponseEntity.ok(pendingSessions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    /**
     * Get all sessions
     * @return List of all sessions
     */
    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return ResponseEntity.ok(sessions);
    }



    /**
     * Get session by ID
     * @param sessionId Session ID
     * @return Session details
     */
    @GetMapping("/{sessionId}")
    public ResponseEntity<?> getSessionById(@PathVariable Long sessionId) {
        try {
            return sessionService.getSessionById(sessionId)
                    .map(session -> ResponseEntity.ok().body(session))
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    /**
     * Search sessions by tutor name
     * @param tutorName Name of the tutor to search for
     * @return List of sessions matching the tutor name
     */
    @GetMapping("/search/tutor")
    public ResponseEntity<?> searchSessionsByTutorName(@RequestParam String tutorName) {
        try {
            List<Session> sessions = sessionService.searchSessionsByTutorName(tutorName);
            return ResponseEntity.ok(sessions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Search failed: " + e.getMessage());
        }
    }

    /**
     * Search sessions by subject/topic
     * @param subject Subject or topic to search for
     * @return List of sessions matching the subject
     */
    @GetMapping("/search/subject")
    public ResponseEntity<?> searchSessionsBySubject(@RequestParam String subject) {
        try {
            List<Session> sessions = sessionService.searchSessionsBySubject(subject);
            return ResponseEntity.ok(sessions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Search failed: " + e.getMessage());
        }
    }

    /**
     * Search sessions by tutor name or subject
     * @param q Search term to match against tutor name or subject
     * @return List of sessions matching the search term
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchSessions(@RequestParam String q) {
        try {
            List<Session> sessions = sessionService.searchSessions(q);
            return ResponseEntity.ok(sessions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Search failed: " + e.getMessage());
        }
    }
}
