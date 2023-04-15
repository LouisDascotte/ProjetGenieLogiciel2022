package com.pgl.energenius.service;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.*;
import com.pgl.energenius.repository.MeterAllocationRepository;
import com.pgl.energenius.repository.MeterRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MeterServiceTest {

    @Mock
    private MeterRepository meterRepository;

    @Mock
    private SecurityUtils securityUtils;

    @Mock
    private ValidationUtils validationUtils;

    @Mock
    private MeterAllocationRepository meterAllocationRepository;

    @InjectMocks
    private MeterService meterService;

    private Meter meter;

    private void setUp() throws InvalidUserDetailsException {

        Client client = new Client();

        meter = Meter.builder()
                .EAN("EAN1234")
                .clientId(client.getId())
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
    }

    @Test
    public void test_getMeter_Client() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        setUp();
        assertEquals(meter, meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_Supplier() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Supplier supplier = Supplier.builder()
                .build();

        Meter meter = Meter.builder()
                .EAN("EAN1234")
                .supplierId(supplier.getId())
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);

        assertEquals(meter, meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_UnauthorizedAccess() throws InvalidUserDetailsException {

        setUp();
        meter.setClientId(null);

        assertThrows(UnauthorizedAccessException.class, () -> meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_ObjectNotFound() {

        assertThrows(ObjectNotFoundException.class, () -> meterService.getMeter("EAN1234"));
    }

    @Test
    public  void test_getMeters_Client() throws InvalidUserDetailsException {

        Client client = new Client();

        meter = Meter.builder()
                .clientId(client.getId())
                .build();

        when(meterRepository.findByClientId(client.getId())).thenReturn(List.of(meter));
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        assertEquals(meter, meterService.getMeters().get(0));
        verify(securityUtils, times(0)).getCurrentSupplierLogin();
    }

    @Test
    public void test_getMeters_Supplier() throws InvalidUserDetailsException {

        Supplier supplier = Supplier.builder()
                .build();

        meter = Meter.builder()
                .supplierId(supplier.getId())
                .build();

        when(meterRepository.findBySupplierId(supplier.getId())).thenReturn(List.of(meter));
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        assertEquals(meter, meterService.getMeters().get(0));
        verify(securityUtils, times(1)).getCurrentClientLogin();
        verify(meterRepository, times(0)).findByClientId(Mockito.any(ObjectId.class));
    }

    @Test
    public void test_getLinkedMetersEAN_Client() throws InvalidUserDetailsException, UnauthorizedAccessException {

        Client client = new Client();

        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
        when(meterRepository.findIdsByClientId(client.getId())).thenReturn(List.of("EAN123"));

        List<String> result = meterService.getLinkedMetersEAN(client.getId());
        assertEquals("EAN123", result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getLinkedMetersEAN_Supplier() throws InvalidUserDetailsException, UnauthorizedAccessException {

        Supplier supplier = new Supplier();

        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        ObjectId clientId = new ObjectId();
        when(meterRepository.findIdsByClientIdAndSupplierId(clientId, supplier.getId())).thenReturn(List.of("EAN123"));

        List<String> result = meterService.getLinkedMetersEAN(clientId);
        assertEquals("EAN123", result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getMetersAllocations() throws InvalidUserDetailsException {

        Client client = new Client();

        MeterAllocation meterAllocation = new MeterAllocation();
        meterAllocation.setClientId(client.getId());

        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
        when(meterAllocationRepository.findByClientId(client.getId())).thenReturn(List.of(meterAllocation));

        List<MeterAllocation> result = meterService.getMetersAllocations();
        assertEquals(meterAllocation, result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getMeterAllocations() throws InvalidUserDetailsException {

        String EAN = "123";
        Client client = new Client();

        MeterAllocation meterAllocation = new MeterAllocation();
        meterAllocation.setClientId(client.getId());
        meterAllocation.setEAN(EAN);

        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
        when(meterAllocationRepository.findByClientIdAndEAN(client.getId(), EAN)).thenReturn(List.of(meterAllocation));

        List<MeterAllocation> result = meterService.getMeterAllocations(EAN);
        assertEquals(meterAllocation, result.get(0));
        assertEquals(1, result.size());
    }
}