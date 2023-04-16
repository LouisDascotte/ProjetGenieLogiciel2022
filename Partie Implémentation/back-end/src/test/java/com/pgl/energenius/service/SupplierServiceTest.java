package com.pgl.energenius.service;

import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.repository.SupplierRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SupplierServiceTest {

    @InjectMocks
    private SupplierService supplierService;

    @Mock
    private SupplierRepository supplierRepository;

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
}
