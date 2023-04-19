package com.pgl.energenius.service;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.repository.NotificationRepository;
import com.pgl.energenius.utils.SecurityUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
public class NotificationServiceTest {

    @InjectMocks
    private NotificationService notificationService;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private SecurityUtils securityUtils;

    @Test
    public void test_getNotifications_Client() throws InvalidUserDetailsException, UnauthorizedAccessException {

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Notification notification = Notification.builder()
                .receiverId(client.getId())
                .build();
        when(notificationRepository.findByReceiverId(client.getId())).thenReturn(List.of(notification));

        List<Notification> result = notificationService.getNotifications();
        assertEquals(notification, result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getNotifications_Supplier() throws InvalidUserDetailsException, UnauthorizedAccessException {

        Supplier supplier = new Supplier();
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        Notification notification = Notification.builder()
                .receiverId(supplier.getId())
                .build();
        when(notificationRepository.findByReceiverId(supplier.getId())).thenReturn(List.of(notification));

        List<Notification> result = notificationService.getNotifications();
        assertEquals(notification, result.get(0));
        assertEquals(1, result.size());
    }
}
