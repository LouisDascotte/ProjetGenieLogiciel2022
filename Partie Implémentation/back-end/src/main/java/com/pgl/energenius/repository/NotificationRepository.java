package com.pgl.energenius.repository;

import com.pgl.energenius.model.notification.Notification;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, ObjectId> {

    List<Notification> findByReceiverId(ObjectId id);
}
