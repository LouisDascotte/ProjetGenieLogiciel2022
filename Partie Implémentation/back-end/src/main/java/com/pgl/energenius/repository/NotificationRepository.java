package com.pgl.energenius.repository;

import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.notification.ContractNotification;
import com.pgl.energenius.model.notification.Notification;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, ObjectId> {

    List<Notification> findByReceiverId(ObjectId id);

    Optional<ContractNotification> findByContract(Contract contract);
}
