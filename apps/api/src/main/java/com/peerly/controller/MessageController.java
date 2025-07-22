package com.peerly.controller;

import com.peerly.entity.Message;
import com.peerly.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    /**
     * Send a message
     * @param messageRequest Request containing senderId, receiverId, and content
     * @return Sent message
     */
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, String> messageRequest) {
        try {
            String senderIdStr = messageRequest.get("senderId");
            String receiverIdStr = messageRequest.get("receiverId");
            String content = messageRequest.get("content");
            
            if (senderIdStr == null || receiverIdStr == null || content == null) {
                return ResponseEntity.badRequest().body("senderId, receiverId, and content are required");
            }
            
            Long senderId;
            Long receiverId;
            
            try {
                senderId = Long.valueOf(senderIdStr);
                receiverId = Long.valueOf(receiverIdStr);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("senderId and receiverId must be valid numbers");
            }
            
            Message sentMessage = messageService.sendMessage(senderId, receiverId, content);
            return ResponseEntity.status(HttpStatus.CREATED).body(sentMessage);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }

    /**
     * Get conversation between two users
     * @param user1Id First user ID
     * @param user2Id Second user ID
     * @return List of messages in chronological order
     */
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        List<Message> conversation = messageService.getConversation(user1Id, user2Id);
        return ResponseEntity.ok(conversation);
    }

    /**
     * Get messages sent by a user
     * @param senderId Sender's user ID
     * @return List of sent messages
     */
    @GetMapping("/sent/{senderId}")
    public ResponseEntity<List<Message>> getMessagesSentByUser(@PathVariable Long senderId) {
        List<Message> sentMessages = messageService.getMessagesSentByUser(senderId);
        return ResponseEntity.ok(sentMessages);
    }

    /**
     * Get messages received by a user
     * @param receiverId Receiver's user ID
     * @return List of received messages
     */
    @GetMapping("/received/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesReceivedByUser(@PathVariable Long receiverId) {
        List<Message> receivedMessages = messageService.getMessagesReceivedByUser(receiverId);
        return ResponseEntity.ok(receivedMessages);
    }

    /**
     * Get unread messages for a user
     * @param receiverId Receiver's user ID
     * @return List of unread messages
     */
    @GetMapping("/unread/{receiverId}")
    public ResponseEntity<List<Message>> getUnreadMessages(@PathVariable Long receiverId) {
        List<Message> unreadMessages = messageService.getUnreadMessages(receiverId);
        return ResponseEntity.ok(unreadMessages);
    }


    /**
     * Mark a message as read
     * @param messageId Message ID
     * @return Updated message
     */
    @PutMapping("/{messageId}/read")
    public ResponseEntity<?> markMessageAsRead(@PathVariable Long messageId) {
        try {
            Message updatedMessage = messageService.markMessageAsRead(messageId);
            return ResponseEntity.ok(updatedMessage);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to mark message as read: " + e.getMessage());
        }
    }


}
