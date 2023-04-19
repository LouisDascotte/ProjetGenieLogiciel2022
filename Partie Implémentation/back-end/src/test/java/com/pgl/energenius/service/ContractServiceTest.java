package com.pgl.energenius.service;

import com.google.maps.errors.ApiException;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.contract.GazElecContract;
import com.pgl.energenius.model.contract.SimpleContract;
import com.pgl.energenius.model.dto.GazElecContractRequestDto;
import com.pgl.energenius.model.dto.SimpleContractRequestDto;
import com.pgl.energenius.model.notification.ContractNotification;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.offer.GazElecOffer;
import com.pgl.energenius.model.offer.Offer;
import com.pgl.energenius.model.offer.SimpleOffer;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.OfferRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ContractServiceTest {

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private SecurityUtils securityUtils;

    @Mock
    private OfferRepository offerRepository;

    @Mock
    private AddressService addressService;

    @Mock
    private SupplierService supplierService;

    @Mock
    private MeterService meterService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private ValidationUtils validationUtils;

    @InjectMocks
    private ContractService contractService;

    @Test
    public void test_getContracts_Client() throws InvalidUserDetailsException {

        Contract contract = new SimpleContract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
        when(contractRepository.findByClientId(client.getId())).thenReturn(contracts);

        assertEquals(contracts, contractService.getContracts());
    }

    @Test
    public void test_getContracts_Supplier() throws InvalidUserDetailsException {

        Contract contract = new SimpleContract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        Supplier supplier = Supplier.builder()
                .build();

        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));
        when(contractRepository.findBySupplierId(supplier.getId())).thenReturn(contracts);

        assertEquals(contracts, contractService.getContracts());
    }

    @Test
    public void test_getValidOffers() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        List<Offer> offers = new ArrayList<>();

        offers.add(SimpleOffer.builder()
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .supplierName("supplier1")
                .build());

        offers.add(SimpleOffer.builder()
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .supplierName("supplier2")
                .build());

        Address address = new Address("123 Rue de Test, Test", 0d, 0d);
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");
        when(addressService.getAddress("123 Rue de Test, Test")).thenReturn(address);

        Supplier supplier1 = Supplier.builder()
                .name("supplier1")
                .operatingAreas(List.of("Test"))
                .build();
        when(supplierService.getSupplierByName("supplier1")).thenReturn(supplier1);
        when(addressService.isAddressInOneOfAreas(supplier1.getOperatingAreas(), address)).thenReturn(true);

        Supplier supplier2 = Supplier.builder()
                .name("supplier2")
                .operatingAreas(List.of("Test2"))
                .build();
        when(supplierService.getSupplierByName("supplier2")).thenReturn(supplier2);
        when(addressService.isAddressInOneOfAreas(supplier2.getOperatingAreas(), address)).thenReturn(false);

        List<Offer> result = contractService.getValidOffers(offers, address.getAddress());

        assertEquals(offers.get(0), result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getOffers_Simple() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.GAZ, "", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        List<SimpleOffer> offers = new ArrayList<>();

        offers.add(SimpleOffer.builder()
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .supplierName("supplier")
                .build());

        when(offerRepository.findByHourTypeAndEnergyType(HourType.SIMPLE, EnergyType.GAZ)).thenReturn(offers);

        Address address = new Address("123 Rue de Test, Test", 0d, 0d);
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");
        when(addressService.getAddress("123 Rue de Test, Test")).thenReturn(address);

        Supplier supplier1 = Supplier.builder()
                .name("supplier")
                .operatingAreas(List.of("Test"))
                .build();

        when(supplierService.getSupplierByName("supplier")).thenReturn(supplier1);
        when(addressService.isAddressInOneOfAreas(supplier1.getOperatingAreas(), address)).thenReturn(true);

        List<Offer> result = contractService.getOffers(contractRequest);

        assertEquals(offers.get(0), result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getOffers_GazElec() throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("", "", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        List<GazElecOffer> offers = new ArrayList<>();

        offers.add(GazElecOffer.builder()
                .hourType(HourType.SIMPLE)
                .supplierName("supplier")
                .build());

        when(offerRepository.findByHourType(HourType.SIMPLE)).thenReturn(offers);

        Address address = new Address("123 Rue de Test, Test", 0d, 0d);
        when(addressService.getFormattedAddress("123 Rue de Test, Test")).thenReturn("123 Rue de Test, Test");
        when(addressService.getAddress("123 Rue de Test, Test")).thenReturn(address);

        Supplier supplier1 = Supplier.builder()
                .name("supplier")
                .operatingAreas(List.of("Test"))
                .build();

        when(supplierService.getSupplierByName("supplier")).thenReturn(supplier1);
        when(addressService.isAddressInOneOfAreas(supplier1.getOperatingAreas(), address)).thenReturn(true);

        List<Offer> result = contractService.getOffers(contractRequest);

        assertEquals(offers.get(0), result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_createSimpleContractRequest() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException, ObjectAlreadyExitsException, ObjectNotValidatedException, BadRequestException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        SimpleOffer offer = SimpleOffer.builder()
                .energyType(contractRequest.getEnergyType())
                .type(Offer.Type.SIMPLE_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Supplier supplier = Supplier.builder()
                .name(offer.getSupplierName())
                .operatingAreas(List.of("Test"))
                .build();
        when(supplierService.getSupplierByName(supplier.getName())).thenReturn(supplier);

        Address address = new Address(contractRequest.getAddress(), 0d, 0d);
        when(addressService.getAddress(address.getAddress())).thenReturn(address);
        when(addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)).thenReturn(true);

        when(contractRepository.existsByEAN(meter.getEAN())).thenReturn(false);

        contractService.createSimpleContractRequest(contractRequest, offer.getId());

        verify(notificationService, times(1)).insertNotification(any(Notification.class));
        verify(contractRepository, times(1)).insert(any(SimpleContract.class));
    }

    @Test
    public void test_createSimpleContractRequest_meter_AFFECTED() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.AFFECTED)
                .address(contractRequest.getAddress())
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        assertThrows(UnauthorizedAccessException.class, () -> contractService.createSimpleContractRequest(contractRequest, new ObjectId()));
    }

    @Test
    public void test_createSimpleContractRequest_different_addresses() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.DISAFFECTED)
                .address("Rue de Test2, Test2")
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        assertThrows(BadRequestException.class, () -> contractService.createSimpleContractRequest(contractRequest, new ObjectId()));
    }

    @Test
    public void test_createSimpleContractRequest_GazElecOffer() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        GazElecOffer offer = GazElecOffer.builder()
                .type(Offer.Type.GAZ_ELEC_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));
        assertThrows(BadRequestException.class, () -> contractService.createSimpleContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createSimpleContractRequest_incorrect_EnergyType() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        SimpleOffer offer = SimpleOffer.builder()
                .energyType(EnergyType.WATER)
                .type(Offer.Type.SIMPLE_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));
        assertThrows(BadRequestException.class, () -> contractService.createSimpleContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createSimpleContractRequest_incorrect_HourType() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        SimpleOffer offer = SimpleOffer.builder()
                .energyType(EnergyType.ELEC)
                .type(Offer.Type.SIMPLE_OFFER)
                .supplierName("supplier")
                .hourType(HourType.DOUBLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));
        assertThrows(BadRequestException.class, () -> contractService.createSimpleContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createSimpleContractRequest_AddressNotInArea() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        SimpleContractRequestDto contractRequest = new SimpleContractRequestDto(EnergyType.ELEC, "EAN123", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter = Meter.builder()
                .EAN(contractRequest.getEAN())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(contractRequest.getEnergyType())
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(contractRequest.getEAN())).thenReturn(meter);
        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        SimpleOffer offer = SimpleOffer.builder()
                .energyType(contractRequest.getEnergyType())
                .type(Offer.Type.SIMPLE_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Supplier supplier = Supplier.builder()
                .name(offer.getSupplierName())
                .operatingAreas(List.of("Test"))
                .build();
        when(supplierService.getSupplierByName(supplier.getName())).thenReturn(supplier);

        Address address = new Address(contractRequest.getAddress(), 0d, 0d);
        when(addressService.getAddress(address.getAddress())).thenReturn(address);
        when(addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)).thenReturn(false);

        assertThrows(BadRequestException.class, () -> contractService.createSimpleContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createGazElecContractRequest() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException, ObjectAlreadyExitsException, ObjectNotValidatedException, BadRequestException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        GazElecOffer offer = GazElecOffer.builder()
                .type(Offer.Type.GAZ_ELEC_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Supplier supplier = Supplier.builder()
                .name(offer.getSupplierName())
                .operatingAreas(List.of("Test"))
                .build();
        when(supplierService.getSupplierByName(supplier.getName())).thenReturn(supplier);

        Address address = new Address(contractRequest.getAddress(), 0d, 0d);
        when(addressService.getAddress(address.getAddress())).thenReturn(address);
        when(addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)).thenReturn(true);

        when(contractRepository.existsByEAN(meter_ELEC.getEAN())).thenReturn(false);
        when(contractRepository.existsByEAN(meter_GAZ.getEAN())).thenReturn(false);

        contractService.createGazElecContractRequest(contractRequest, offer.getId());

        verify(notificationService, times(1)).insertNotification(any(Notification.class));
        verify(contractRepository, times(1)).insert(any(GazElecContract.class));
    }

    @Test
    public void test_createGazElecContractRequest_meter_AFFECTED() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.AFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        assertThrows(UnauthorizedAccessException.class, () -> contractService.createGazElecContractRequest(contractRequest, new ObjectId()));
    }

    @Test
    public void test_createGazElecContractRequest_different_addresses() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.DISAFFECTED)
                .address("Rue de Test2, Test2")
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        assertThrows(BadRequestException.class, () -> contractService.createGazElecContractRequest(contractRequest, new ObjectId()));
    }

    @Test
    public void test_createGazElecContractRequest_SimpleOffer() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        SimpleOffer offer = SimpleOffer.builder()
                .type(Offer.Type.SIMPLE_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        assertThrows(BadRequestException.class, () -> contractService.createGazElecContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createGazElecContractRequest_incorrect_EnergyType() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.WATER)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        GazElecOffer offer = GazElecOffer.builder()
                .type(Offer.Type.GAZ_ELEC_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        assertThrows(BadRequestException.class, () -> contractService.createGazElecContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createGazElecContractRequest_incorrect_MeterType() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.ELEC)
                .meterType(MeterType.NUMERIC)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        GazElecOffer offer = GazElecOffer.builder()
                .type(Offer.Type.GAZ_ELEC_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        assertThrows(BadRequestException.class, () -> contractService.createGazElecContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_createGazElecContractRequest_AddressNotInArea() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, IOException, InterruptedException, ApiException {

        GazElecContractRequestDto contractRequest = new GazElecContractRequestDto("EAN123", "EAN456", MeterType.MANUAL, "123 Rue de Test, Test", HourType.SIMPLE);

        Meter meter_ELEC = Meter.builder()
                .EAN(contractRequest.getEAN_ELEC())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.ELEC)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_ELEC.getEAN())).thenReturn(meter_ELEC);

        Meter meter_GAZ = Meter.builder()
                .EAN(contractRequest.getEAN_GAZ())
                .status(Meter.Status.DISAFFECTED)
                .address(contractRequest.getAddress())
                .energyType(EnergyType.GAZ)
                .hourType(HourType.SIMPLE)
                .build();
        when(meterService.getMeter(meter_GAZ.getEAN())).thenReturn(meter_GAZ);

        when(addressService.getFormattedAddress(contractRequest.getAddress())).thenReturn(contractRequest.getAddress());

        GazElecOffer offer = GazElecOffer.builder()
                .type(Offer.Type.GAZ_ELEC_OFFER)
                .supplierName("supplier")
                .hourType(HourType.SIMPLE)
                .build();
        when(offerRepository.findById(offer.getId())).thenReturn(Optional.of(offer));

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Supplier supplier = Supplier.builder()
                .name(offer.getSupplierName())
                .operatingAreas(List.of("Test"))
                .build();
        when(supplierService.getSupplierByName(supplier.getName())).thenReturn(supplier);

        Address address = new Address(contractRequest.getAddress(), 0d, 0d);
        when(addressService.getAddress(address.getAddress())).thenReturn(address);
        when(addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)).thenReturn(false);

        assertThrows(BadRequestException.class, () -> contractService.createGazElecContractRequest(contractRequest, offer.getId()));
    }

    @Test
    public void test_insertContract_SimpleContract() throws ObjectAlreadyExitsException, ObjectNotValidatedException {

        SimpleContract contract = SimpleContract.builder().EAN("EAN123").build();

        when(contractRepository.existsByEAN(contract.getEAN())).thenReturn(false);
        when(contractRepository.insert(contract)).thenReturn(contract);

        assertEquals(contract, contractService.insertContract(contract));
    }

    @Test
    public void test_insertContract_SimpleContract_ObjectAlreadyExists() {

        SimpleContract contract = SimpleContract.builder().EAN("EAN123").build();
        when(contractRepository.existsByEAN(contract.getEAN())).thenReturn(true);

        assertThrows(ObjectAlreadyExitsException.class, () -> contractService.insertContract(contract));
    }

    @Test
    public void test_insertContract_GazElecContract() throws ObjectAlreadyExitsException, ObjectNotValidatedException {

        GazElecContract contract = GazElecContract.builder().EAN_ELEC("EAN123").EAN_GAZ("EAN456").build();

        when(contractRepository.existsByEAN(contract.getEAN_GAZ())).thenReturn(false);
        when(contractRepository.existsByEAN(contract.getEAN_ELEC())).thenReturn(false);
        when(contractRepository.insert(contract)).thenReturn(contract);

        assertEquals(contract, contractService.insertContract(contract));
    }

    @Test
    public void test_insertContract_GazElecContract_ObjectAlreadyExists() {

        GazElecContract contract = GazElecContract.builder().EAN_ELEC("EAN123").EAN_GAZ("EAN456").build();
        when(contractRepository.existsByEAN(contract.getEAN_ELEC())).thenReturn(true);

        assertThrows(ObjectAlreadyExitsException.class, () -> contractService.insertContract(contract));

        when(contractRepository.existsByEAN(contract.getEAN_ELEC())).thenReturn(false);
        when(contractRepository.existsByEAN(contract.getEAN_GAZ())).thenReturn(true);

        assertThrows(ObjectAlreadyExitsException.class, () -> contractService.insertContract(contract));
    }

    @Test
    public void test_cancelContract_Client_PENDING() throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        SimpleContract contract = SimpleContract.builder()
                .status(Contract.Status.PENDING)
                .clientId(client.getId())
                .supplierId(new ObjectId())
                .build();
        when(contractRepository.findById(contract.getId())).thenReturn(Optional.of(contract));

        contractService.cancelContract(contract.getId());
        verify(notificationService, times(1)).deleteByContract(contract);
        verify(contractRepository, times(1)).delete(contract);
    }

    @Test
    public void test_cancelContract_Client_ACCEPTED() throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        SimpleContract contract = SimpleContract.builder()
                .status(Contract.Status.ACCEPTED)
                .clientId(client.getId())
                .supplierId(new ObjectId())
                .build();
        when(contractRepository.findById(contract.getId())).thenReturn(Optional.of(contract));

        contractService.cancelContract(contract.getId());
        verify(notificationService, times(1)).insertNotification(any(ContractNotification.class));
    }

    @Test
    public void test_cancelContract_Supplier() throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        Supplier supplier = new Supplier();
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);

        SimpleContract contract = SimpleContract.builder()
                .status(Contract.Status.ACCEPTED)
                .clientId(new ObjectId())
                .supplierId(supplier.getId())
                .build();
        when(contractRepository.findById(contract.getId())).thenReturn(Optional.of(contract));

        contractService.cancelContract(contract.getId());
        verify(notificationService, times(1)).insertNotification(any(Notification.class));
        verify(contractRepository, times(1)).delete(contract);
    }

    @Test
    public void test_getMeter_Client() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        SimpleContract contract = SimpleContract.builder()
                .status(Contract.Status.PENDING)
                .clientId(client.getId())
                .supplierId(new ObjectId())
                .build();
        when(contractRepository.findById(contract.getId())).thenReturn(Optional.of(contract));

        assertEquals(contract, contractService.getContract(contract.getId()));
    }

    @Test
    public void test_getMeter_Supplier() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Supplier supplier = new Supplier();
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        SimpleContract contract = SimpleContract.builder()
                .status(Contract.Status.PENDING)
                .clientId(new ObjectId())
                .supplierId(supplier.getId())
                .build();
        when(contractRepository.findById(contract.getId())).thenReturn(Optional.of(contract));

        assertEquals(contract, contractService.getContract(contract.getId()));
    }

    @Test
    public void test_getMeter_UnauthorizedAccess() throws InvalidUserDetailsException {

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        SimpleContract contract = SimpleContract.builder()
                .status(Contract.Status.PENDING)
                .clientId(new ObjectId())
                .supplierId(new ObjectId())
                .build();
        when(contractRepository.findById(contract.getId())).thenReturn(Optional.of(contract));

        assertThrows(UnauthorizedAccessException.class, () -> contractService.getContract(contract.getId()));
    }

    @Test
    public void test_getMeter_ObjectNotFound() {

        assertThrows(ObjectNotFoundException.class, () -> contractService.getContract(new ObjectId()));
    }
}
