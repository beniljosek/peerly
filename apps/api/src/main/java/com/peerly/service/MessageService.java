package com.peerly.service;

import com.peerly.entity.Message;
import com.peerly.repository.MessageRepository;
import com.peerly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Send a message from one user to another
     * @param senderId Sender's user ID
     * @param receiverId Receiver's user ID
     * @param content Message content
     * @return Sent message
     */
    public Message sendMessage(Long senderId, Long receiverId, String content) {
        // Validate that both users exist
        if (!userRepository.findById(Long.valueOf(senderId)).isPresent()) {
            throw new RuntimeException("Sender not found with ID: " + senderId);
        }
        
        if (!userRepository.findById(Long.valueOf(receiverId)).isPresent()) {
            throw new RuntimeException("Receiver not found with ID: " + receiverId);
        }
        
        // Validate content
        if (content == null || content.trim().isEmpty()) {
            throw new RuntimeException("Message content cannot be empty");
        }
        
        // Create and save message
        Message message = new Message();
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(content.trim());
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);
        
        return messageRepository.save(message);
    }
    
    /**
     * Get conversation between two users
     * @param user1Id First user ID
     * @param user2Id Second user ID
     * @return List of messages in chronological order
     */
    public List<Message> getConversation(Long user1Id, Long user2Id) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(user1Id, user2Id,user2Id,user1Id);
    }

    
    /**
     * Get unread messages for a user
     * @param receiverId Receiver's user ID
     * @return List of unread messages
     */
    public List<Message> getUnreadMessages(Long receiverId) {
        return messageRepository.findByReceiverIdAndIsReadFalse(receiverId);
    }

    
    /**
     * Mark a message as read
     * @param messageId Message ID
     * @return Updated message
     */
    public Message markMessageAsRead(Long messageId) {
        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            throw new RuntimeException("Message not found with ID: " + messageId);
        }
        
        Message message = messageOpt.get();
        message.setRead(true);
        
        return messageRepository.save(message);
    }


    
    /**
     * Get message by ID
     * @param messageId Message ID
     * @return Optional message
     */
    public Optional<Message> getMessageById(Long messageId) {
        return messageRepository.findById(messageId);
    }

    public List<Message> getMessagesSentByUser(Long senderId) {

        return messageRepository.findBySenderIdOrderByTimestampDesc(senderId);
    }

    public List<Message> getMessagesReceivedByUser(Long receiverId) {
        return messageRepository.findByReceiverIdOrderByTimestampDesc(receiverId);
    }
}
