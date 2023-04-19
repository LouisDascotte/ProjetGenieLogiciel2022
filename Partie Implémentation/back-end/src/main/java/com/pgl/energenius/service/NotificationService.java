package com.pgl.energenius.service;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.notification.ContractNotification;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.repository.NotificationRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ValidationUtils validationUtils;

    @Autowired
    private SecurityUtils securityUtils;

    public Notification insertNotification(Notification notification) throws ObjectNotValidatedException {

        validationUtils.validate(notification);
        return notificationRepository.insert(notification);
    }

    public void saveNotification(Notification notification) throws ObjectNotValidatedException {

        validationUtils.validate(notification);
        notificationRepository.save(notification);
    }

    public void deleteByContract(Contract contract) throws ObjectNotFoundException {

        ContractNotification notification = notificationRepository.findByContract(contract)
                .orElseThrow(() -> new ObjectNotFoundException("No notification found with contract of id: " + contract.getId()));
        notificationRepository.delete(notification);
    }

    public List<Notification> getNotifications() throws InvalidUserDetailsException, UnauthorizedAccessException {

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();
            return notificationRepository.findByReceiverId(client.getId());

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        return notificationRepository.findByReceiverId(supplier.getId());
    }
}
