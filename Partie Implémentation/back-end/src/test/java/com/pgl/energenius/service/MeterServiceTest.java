package com.pgl.energenius.service;

import com.google.maps.errors.ApiException;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.exception.*;
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

import java.io.IOException;
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

    @Mock
    private AddressService addressService;

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
    public void test_getMeterAllocations_Client() throws InvalidUserDetailsException {

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

    @Test
    public void test_getMeterAllocations_Supplier() throws InvalidUserDetailsException {

        String EAN = "123";
        Supplier supplier = Supplier.builder().name("supplier").build();

        MeterAllocation meterAllocation = new MeterAllocation();
        meterAllocation.setSupplierName(supplier.getName());
        meterAllocation.setEAN(EAN);

        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));
        when(meterAllocationRepository.findBySupplierNameAndEAN(supplier.getName(), EAN)).thenReturn(List.of(meterAllocation));

        List<MeterAllocation> result = meterService.getMeterAllocations(EAN);
        assertEquals(meterAllocation, result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_deleteMeterIf_AWAITING_APPROVAL() throws ObjectNotFoundException {

        Meter meter = new Meter();
        when(meterRepository.findById("EAN123")).thenReturn(Optional.of(meter));

        meterService.deleteMeterIf_AWAITING_APPROVAL("EAN123");

        verify(meterRepository, times(1)).delete(meter);
    }

    @Test
    public void test_deleteMeterIf_AWAITING_APPROVAL_False() throws ObjectNotFoundException {

        Meter meter = new Meter();
        meter.setStatus(Meter.Status.AFFECTED);
        when(meterRepository.findById("EAN123")).thenReturn(Optional.of(meter));

        meterService.deleteMeterIf_AWAITING_APPROVAL("EAN123");

        verify(meterRepository, times(0)).delete(meter);
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck() throws ObjectNotFoundException, IOException, InterruptedException, ApiException, ObjectNotValidatedException, UnauthorizedAccessException, BadRequestException {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .status(Meter.Status.DISAFFECTED)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.of(meter));
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");

        assertEquals(meter, meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), meter.getAddress(), meter.getMeterType(), meter.getEnergyType(), meter.getHourType()));
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck_AFFECTED() {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .status(Meter.Status.AFFECTED)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.of(meter));

        assertThrows(UnauthorizedAccessException.class, () -> meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), meter.getAddress(), meter.getMeterType(), meter.getEnergyType(), meter.getHourType()));
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck_incorrect_Address() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .status(Meter.Status.DISAFFECTED)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.of(meter));
        when(addressService.getFormattedAddress("Incorrect address")).thenReturn("Incorrect address");

        assertThrows(BadRequestException.class, () -> meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), "Incorrect address", meter.getMeterType(), meter.getEnergyType(), meter.getHourType()));
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck_incorrect_MeterType() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .status(Meter.Status.DISAFFECTED)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.of(meter));
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");

        assertThrows(BadRequestException.class, () -> meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), meter.getAddress(), MeterType.NUMERIC, meter.getEnergyType(), meter.getHourType()));
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck_incorrect_EnergyType() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .status(Meter.Status.DISAFFECTED)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.of(meter));
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");

        assertThrows(BadRequestException.class, () -> meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), meter.getAddress(), meter.getMeterType(), EnergyType.GAZ, meter.getHourType()));
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck_incorrect_HourType() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .status(Meter.Status.DISAFFECTED)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.of(meter));
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");

        assertThrows(BadRequestException.class, () -> meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), meter.getAddress(), meter.getMeterType(), meter.getEnergyType(), HourType.DOUBLE));
    }

    @Test
    public void test_createMeterIfNotExistsAndCheck_Create() throws ObjectNotFoundException, IOException, InterruptedException, ApiException, ObjectNotValidatedException, UnauthorizedAccessException, BadRequestException {

        Meter meter = Meter.builder()
                .EAN("EAN123")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .meterType(MeterType.MANUAL)
                .address("123 Rue de Test, Test")
                .build();
        when(meterRepository.findById(meter.getEAN())).thenReturn(Optional.empty());
        when(addressService.createAddress("123 Rue de Test, Test")).thenReturn(new Address("123 Rue de Test, Test", 0d, 0d));

        assertEquals(meter, meterService.createMeterIfNotExistsAndCheck(meter.getEAN(), meter.getAddress(), meter.getMeterType(), meter.getEnergyType(), meter.getHourType()));
        verify(meterRepository, times(1)).insert(meter);
    }
}