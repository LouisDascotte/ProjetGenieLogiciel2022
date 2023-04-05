package com.pgl.energenius.ServiceTests;

import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.EmployeeLogin;
import com.pgl.energenius.Repositories.UserRepository;
import com.pgl.energenius.Services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

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
    public void test_loadUserByUsername_EmployeeLogin() {

        EmployeeLogin employeeLogin = new EmployeeLogin();
        when(userRepository.findByLoginId("test")).thenReturn(Optional.of(employeeLogin));
        when(userRepository.findByEmail("test")).thenReturn(Optional.empty());

        assertEquals(employeeLogin, userService.loadUserByUsername("test"));
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
}
