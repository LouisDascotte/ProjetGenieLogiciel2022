package com.pgl.energenius.service;

import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.repository.UserRepository;
import com.pgl.energenius.utils.EmailUtils;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailUtils emailUtils;

    @InjectMocks
    private UserService userService;

    @Test
    public void test_loadUserByUsername_ClientLogin() {

        ClientLogin clientLogin = new ClientLogin();
        when(userRepository.findByEmail("test")).thenReturn(Optional.of(clientLogin));

        assertEquals(clientLogin, userService.loadUserByUsername("test"));
        verify(userRepository, times(0)).findByLoginId("test");
    }

    @Test
    public void test_loadUserByUsername_SupplierLogin() {

        SupplierLogin supplierLogin = new SupplierLogin();
        when(userRepository.findByLoginId("test")).thenReturn(Optional.of(supplierLogin));
        when(userRepository.findByEmail("test")).thenReturn(Optional.empty());

        assertEquals(supplierLogin, userService.loadUserByUsername("test"));
        verify(userRepository, times(1)).findByEmail("test");
    }

    @Test
    public void test_loadUserByUsername_UsernameNotFound() {

        when(userRepository.findByEmail("test")).thenReturn(Optional.empty());
        when(userRepository.findByLoginId("test")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername("test"));

        verify(userRepository, times(1)).findByEmail("test");
        verify(userRepository, times(1)).findByLoginId("test");
    }

    @Test
    public void test_existsByEmail_present() {

        when(userRepository.findByEmail("test")).thenReturn(Optional.of(new ClientLogin()));
        assertTrue(userService.existsByEmail("test"));
    }

    @Test
    public void test_existsByEmail_not_present() {

        when(userRepository.findByEmail("test")).thenReturn(Optional.empty());
        assertFalse(userService.existsByEmail("test"));
    }

    @Test
    public void test_resetPasswordClient() throws MessagingException, ObjectNotFoundException {

        when(userRepository.findByEmail("test")).thenReturn(Optional.of(new ClientLogin()));

        userService.resetPasswordClient("test", "123");
        verify(emailUtils, times(1)).sendPasswordResetMail("test", "123");
    }

    @Test
    public void test_resetPasswordClient_ObjectNotFound() {

        when(userRepository.findByEmail("test")).thenReturn(Optional.empty());
        assertThrows(ObjectNotFoundException.class, () -> userService.resetPasswordClient("test", "123"));
    }

    @Test
    public void test_changePasswordClient() throws ObjectNotFoundException {

        ClientLogin clientLogin = new ClientLogin();
        when(userRepository.findByEmail("test")).thenReturn(Optional.of(clientLogin));

        userService.changePasswordClient("test", "test");
        verify(userRepository, times(1)).save(clientLogin);
    }
}
