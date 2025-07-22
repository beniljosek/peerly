package com.peerly.service;

import com.peerly.dto.SessionBookingRequest;
import com.peerly.entity.Session;
import com.peerly.entity.User;
import com.peerly.repository.SessionRepository;
import com.peerly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {
    
    @Autowired
    private SessionRepository sessionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Book a session with a tutor
     * @param request Session booking request
     * @return Booked session
     * @throws RuntimeException if booking fails
     */
    public Session bookSession(SessionBookingRequest request) {
        // Validate tutor exists and is active
        Optional<User> tutorOpt = userRepository.findById(request.getTutorId());
        if (tutorOpt.isEmpty()) {
            throw new RuntimeException("Tutor not found with ID: " + request.getTutorId());
        }
        
        User tutor = tutorOpt.get();
        if (!tutor.getIsActive()) {
            throw new RuntimeException("Tutor is not available for booking");
        }
        
        // Validate that the user can act as a tutor
        if (!tutor.isTutor()) {
            throw new RuntimeException("User is not registered as a tutor");
        }
        
        // Validate student exists and is active
        Optional<User> studentOpt = userRepository.findById(request.getStudentId());
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + request.getStudentId());
        }
        
        User student = studentOpt.get();
        if (!student.getIsActive()) {
            throw new RuntimeException("Student account is not active");
        }
        
        // Validate that the user can act as a student
        if (!student.isStudent()) {
            throw new RuntimeException("User is not registered as a student");
        }
        
        // Validate session time is in the future
        if (request.getSessionDateTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Session time must be in the future");
        }
        
        // Check if tutor is available at the requested time
        LocalDateTime endTime = request.getSessionDateTime().plusMinutes(request.getDurationMinutes());
        Long conflictCount = sessionRepository.countConflictingSessions(
            tutor,
            request.getSessionDateTime(),
            endTime
        );

        if (conflictCount > 0) {
            throw new RuntimeException("Tutor is not available at the requested time");
        }
        
        // Create and save the session
        Session session = new Session();
        session.setTutor(tutor);
        session.setStudent(student);
        session.setSessionDateTime(request.getSessionDateTime());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setSubject(request.getSubject());
        session.setNotes(request.getNotes());
        session.setStatus(Session.SessionStatus.PENDING);
        session.setSupercoinsAmount(request.getSupercoinsAmount());
        session.setSupercoinsProcessed(false);
        session.setCreatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session);
    }
    
    /**
     * Get all sessions
     * @return List of all sessions
     */
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }
    
    /**
     * Get sessions by student ID
     * @param studentId Student's ID
     * @return List of sessions for the student
     */
    public List<Session> getSessionsByStudentId(Long studentId) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
        return sessionRepository.findByStudent(studentOpt.get());
    }
    
    /**
     * Get sessions by tutor ID
     * @param tutorId Tutor's ID
     * @return List of sessions for the tutor
     */
    public List<Session> getSessionsByTutorId(Long tutorId) {
        Optional<User> tutorOpt = userRepository.findById(tutorId);
        if (tutorOpt.isEmpty()) {
            throw new RuntimeException("Tutor not found with ID: " + tutorId);
        }
        return sessionRepository.findByTutor(tutorOpt.get());
    }
    
    /**
     * Get upcoming sessions for a tutor
     * @param tutorId Tutor's ID
     * @return List of upcoming sessions
     */
    public List<Session> getUpcomingSessionsByTutorId(Long tutorId) {
        Optional<User> tutorOpt = userRepository.findById(tutorId);
        if (tutorOpt.isEmpty()) {
            throw new RuntimeException("Tutor not found with ID: " + tutorId);
        }
        return sessionRepository.findUpcomingSessionsByTutor(tutorOpt.get(), LocalDateTime.now());
    }
    
    /**
     * Get upcoming sessions for a student
     * @param studentId Student's ID
     * @return List of upcoming sessions
     */
    public List<Session> getUpcomingSessionsByStudentId(Long studentId) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
        return sessionRepository.findUpcomingSessionsByStudent(studentOpt.get(), LocalDateTime.now());
    }
    
    /**
     * Get session by ID
     * @param sessionId Session ID
     * @return Optional session
     */
    public Optional<Session> getSessionById(Long sessionId) {
        return sessionRepository.findById(sessionId);
    }
    
    /**
     * Search sessions by tutor name
     * @param tutorName Name of the tutor to search for
     * @return List of sessions matching the tutor name
     */
    public List<Session> searchSessionsByTutorName(String tutorName) {
        if (tutorName == null || tutorName.trim().isEmpty()) {
            throw new RuntimeException("Tutor name cannot be empty");
        }
        return sessionRepository.findByTutorNameContainingIgnoreCase(tutorName.trim());
    }
    
    /**
     * Search sessions by subject/topic
     * @param subject Subject or topic to search for
     * @return List of sessions matching the subject
     */
    public List<Session> searchSessionsBySubject(String subject) {
        if (subject == null || subject.trim().isEmpty()) {
            throw new RuntimeException("Subject cannot be empty");
        }
        return sessionRepository.findBySubjectContainingIgnoreCase(subject.trim());
    }
    
    /**
     * Search sessions by tutor name or subject
     * @param searchTerm Search term to match against tutor name or subject
     * @return List of sessions matching the search term
     */
    public List<Session> searchSessions(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            throw new RuntimeException("Search term cannot be empty");
        }
        return sessionRepository.findByTutorNameOrSubjectContainingIgnoreCase(searchTerm.trim());
    }
    
    /**
     * Accept a session request (for tutors)
     * @param sessionId Session ID to accept
     * @param tutorId Tutor ID for validation
     * @return Updated session with CONFIRMED status
     */
    public Session acceptSessionRequest(Long sessionId, Long tutorId) {
        Optional<Session> sessionOpt = sessionRepository.findById(sessionId);
        if (sessionOpt.isEmpty()) {
            throw new RuntimeException("Session not found with ID: " + sessionId);
        }
        
        Session session = sessionOpt.get();
        
        // Check if the requesting user is the tutor for this session
        if (!session.getTutor().getId().equals(tutorId)) {
            throw new RuntimeException("You are not authorized to accept this session");
        }
        
        // Check if session is in PENDING status
        if (session.getStatus() != Session.SessionStatus.PENDING) {
            throw new RuntimeException("Only pending sessions can be accepted. Current status: " + session.getStatus());
        }
        
        // Validate session time is still in the future
        if (session.getSessionDateTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Cannot accept a session that is in the past");
        }
        
        // Update status to CONFIRMED
        session.setStatus(Session.SessionStatus.CONFIRMED);
        session.setUpdatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session);
    }
    
    /**
     * Reject a session request (for tutors)
     * @param sessionId Session ID to reject
     * @param tutorId Tutor ID for validation
     * @return Updated session with CANCELLED status
     */
    public Session rejectSessionRequest(Long sessionId, Long tutorId) {
        Optional<Session> sessionOpt = sessionRepository.findById(sessionId);
        if (sessionOpt.isEmpty()) {
            throw new RuntimeException("Session not found with ID: " + sessionId);
        }
        
        Session session = sessionOpt.get();
        
        // Check if the requesting user is the tutor for this session
        if (!session.getTutor().getId().equals(tutorId)) {
            throw new RuntimeException("You are not authorized to reject this session");
        }
        
        // Check if session is in PENDING status
        if (session.getStatus() != Session.SessionStatus.PENDING) {
            throw new RuntimeException("Only pending sessions can be rejected. Current status: " + session.getStatus());
        }
        
        // Update status to CANCELLED
        session.setStatus(Session.SessionStatus.CANCELLED);
        session.setUpdatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session);
    }
    
    /**
     * Get pending sessions for a tutor (sessions awaiting tutor's response)
     * @param tutorId Tutor's ID
     * @return List of pending sessions for the tutor
     */
    public List<Session> getPendingSessionsForTutor(Long tutorId) {
        Optional<User> tutorOpt = userRepository.findById(tutorId);
        if (tutorOpt.isEmpty()) {
            throw new RuntimeException("Tutor not found with ID: " + tutorId);
        }
        return sessionRepository.findByTutorAndStatus(tutorOpt.get(), Session.SessionStatus.PENDING);
    }
    
    /**
     * Complete a session and process supercoins
     * @param sessionId Session ID
     * @param tutorId Tutor ID for validation
     * @return Updated session
     */
    public Session completeSession(Long sessionId, Long tutorId) {
        Optional<Session> sessionOpt = sessionRepository.findById(sessionId);
        if (sessionOpt.isEmpty()) {
            throw new RuntimeException("Session not found with ID: " + sessionId);
        }
        
        Session session = sessionOpt.get();
        
        // Check if the requesting user is the tutor for this session
        if (!session.getTutor().getId().equals(tutorId)) {
            throw new RuntimeException("You are not authorized to complete this session");
        }
        
        // Check if session is in CONFIRMED status
        if (session.getStatus() != Session.SessionStatus.CONFIRMED) {
            throw new RuntimeException("Only confirmed sessions can be completed. Current status: " + session.getStatus());
        }
        
        // Update status to COMPLETED
        session.setStatus(Session.SessionStatus.COMPLETED);
        session.setUpdatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session);
    }
    
    /**
     * Process supercoins for completed sessions
     * @param sessionId Session ID
     * @return Updated session with supercoins processed
     */
    public Session processSessionSupercoins(Long sessionId) {
        Optional<Session> sessionOpt = sessionRepository.findById(sessionId);
        if (sessionOpt.isEmpty()) {
            throw new RuntimeException("Session not found with ID: " + sessionId);
        }
        
        Session session = sessionOpt.get();
        
        // Check if session is completed and not already processed
        if (session.getStatus() != Session.SessionStatus.COMPLETED) {
            throw new RuntimeException("Only completed sessions can have supercoins processed");
        }
        
        // Transfer supercoins from student to tutor
        User student = session.getStudent();
        User tutor = session.getTutor();
        Long amount = session.getSupercoinsAmount();
        
        if (amount != null && amount > 0) {
            // Check if student has enough supercoins
            if (student.getSupercoins() < amount) {
                throw new RuntimeException("Student does not have enough supercoins for this session");
            }
            
            // Transfer supercoins
            try {
                student.debitSupercoins(amount);
            } catch (User.InsufficientSupercoinsException e) {
                throw new RuntimeException(e);
            }
            tutor.creditSupercoins(amount);
            
            // Save updated users
            userRepository.save(student);
            userRepository.save(tutor);
        }
        
        // Mark session as processed
        session.setSupercoinsProcessed(true);
        session.setUpdatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session);
    }
    
    /**
     * Get all sessions that need supercoin processing
     * @return List of sessions needing processing
     */
    public List<Session> getSessionsNeedingSupercoinsProcessing() {
        return sessionRepository.findSessionsNeedingSupercoinsProcessing();
    }
}
