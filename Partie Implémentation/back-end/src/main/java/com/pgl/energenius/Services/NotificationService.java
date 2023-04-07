package com.pgl.energenius.Services;

import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Objects.notifications.Notification;
import com.pgl.energenius.Repositories.NotificationRepository;
import com.pgl.energenius.Utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ValidationUtils validationUtils;

    public Notification insertNotification(Notification notification) throws ObjectNotValidatedException {

        validationUtils.validate(notification);
        return notificationRepository.insert(notification);
    }

    public void saveNotification(Notification notification) throws ObjectNotValidatedException {

        validationUtils.validate(notification);
        notificationRepository.save(notification);
    }
}
