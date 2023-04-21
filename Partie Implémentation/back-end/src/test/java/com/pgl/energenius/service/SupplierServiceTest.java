package com.pgl.energenius.service;

import com.pgl.energenius.config.WebSecurityConfig;
import com.pgl.energenius.enums.Lang;
import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.model.dto.ClientPreferencesDto;
import com.pgl.energenius.model.dto.SupplierPreferenceDto;
import com.pgl.energenius.repository.SupplierRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SupplierServiceTest {

    @InjectMocks
    private SupplierService supplierService;

    @Mock
    private SupplierRepository supplierRepository;

    @Mock
    private SecurityUtils securityUtils;

    @Mock
    private ValidationUtils validationUtils;

    @Mock
    private UserService userService;

    @Test
    public void test_getSupplierByName() throws ObjectNotFoundException {

        Supplier supplier = Supplier.builder()
                .name("Test")
                .build();

        when(supplierRepository.findByName("Test")).thenReturn(Optional.of(supplier));
        assertEquals(supplier, supplierService.getSupplierByName("Test"));
    }

    @Test
    public void test_getSupplierByName_ObjectNotFound() {

        when(supplierRepository.findByName("Test")).thenReturn(Optional.empty());
        assertThrows(ObjectNotFoundException.class, () -> supplierService.getSupplierByName("Test"));
    }

    @Test
    public void test_editPreferences_password() throws InvalidUserDetailsException, ObjectNotValidatedException {

        Supplier supplier = new Supplier();
        SupplierLogin supplierLogin = new SupplierLogin("", WebSecurityConfig.passwordEncoder().encode("password"), supplier);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(supplierLogin);

        SupplierPreferenceDto supplierPreferenceDto = new SupplierPreferenceDto(null, "password", "newPassword");

        supplierService.editPreferences(supplierPreferenceDto);

        verify(userService, times(1)).saveUser(any(SupplierLogin.class));
        assertTrue(WebSecurityConfig.passwordEncoder().matches("newPassword", supplierLogin.getPassword()));
        verify(supplierRepository, times(0)).save(any(Supplier.class));
    }

    @Test
    public void test_editPreferences_lang() throws InvalidUserDetailsException, ObjectNotValidatedException {

        Supplier supplier = Supplier.builder().lang(Lang.FR).build();
        SupplierLogin supplierLogin = new SupplierLogin("", "", supplier);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(supplierLogin);

        SupplierPreferenceDto supplierPreferenceDto = new SupplierPreferenceDto(Lang.EN, null, null);

        supplierService.editPreferences(supplierPreferenceDto);

        assertEquals(Lang.EN, supplier.getLang());
        verify(userService, times(0)).saveUser(any(SupplierLogin.class));
        verify(supplierRepository, times(1)).save(any(Supplier.class));
    }
}
