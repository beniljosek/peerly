package com.peerly.repository;

import com.peerly.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
            Long senderId, Long receiverId, Long receiverId2, Long senderId2
    );

    List<Message> findByReceiverIdAndIsReadFalse(Long receiverId);

    List<Message> findBySenderIdOrderByTimestampDesc(Long senderId);

    List<Message> findByReceiverIdOrderByTimestampDesc(Long receiverId);
}
