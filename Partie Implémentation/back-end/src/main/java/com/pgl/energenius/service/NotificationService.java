package com.pgl.energenius.service;

import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ValidationService validationService;

    public Notification insertNotification(Notification notification) throws ObjectNotValidatedException {

        validationService.validate(notification);
        return notificationRepository.insert(notification);
    }

    public void saveNotification(Notification notification) throws ObjectNotValidatedException {

        validationService.validate(notification);
        notificationRepository.save(notification);
    }
}
