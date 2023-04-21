package com.pgl.energenius.service;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.model.projection.PortfolioProjection;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.repository.PortfolioRepository;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PortfolioServiceTest {

    @Mock
    private PortfolioRepository portfolioRepository;

    @Mock
    private SecurityUtils securityUtils;

    @Mock
    private AddressService addressService;

    @Mock
    private MeterService meterService;

    @Mock
    private ValidationUtils validationUtils;

    @Mock
    private ReadingService readingService;

    @Mock
    private ClientService clientService;

    @InjectMocks
    private PortfolioService portfolioService;

    private Portfolio portfolio;

    private void setUp() throws InvalidUserDetailsException {

        // Mostly used for the getPortfolio() method
        Client client = new Client();
//        PortfolioDto portfolioDto = new PortfolioDto();
        portfolio = Portfolio.builder()
                .clientId(client.getId())
                .build();

        when(portfolioRepository.findById(portfolio.getId())).thenReturn(Optional.of(portfolio));
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
    }

    @Test
    public void test_getPortfolio() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();
        assertEquals(portfolio, portfolioService.getPortfolio(portfolio.getId()));
    }

    @Test
    public void test_getPortfolio_ObjectNotFound() {
        ObjectId id = new ObjectId();
        when(portfolioRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ObjectNotFoundException.class, () -> portfolioService.getPortfolio(id));
    }

    @Test
    public void test_getPortfolio_Unauthorized() throws InvalidUserDetailsException {

        setUp();
        Client client2 = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client2));
        assertThrows(UnauthorizedAccessException.class, () -> portfolioService.getPortfolio(portfolio.getId()));
    }

    @Test
    public void test_getPortfolio_InvalidUserDetails() throws InvalidUserDetailsException {

        setUp();
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        assertThrows(InvalidUserDetailsException.class, () -> portfolioService.getPortfolio(portfolio.getId()));
    }

    @Test
    public void test_deletePortfolio() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();
        portfolioService.deletePortfolio(portfolio.getId());
        verify(portfolioRepository, times(1)).delete(portfolio);
    }

    @Test
    public void test_getPortfolioConsumption() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();

        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        Meter meter = Meter.builder().EAN("EAN1234").energyType(EnergyType.ELEC).build();
        when(meterService.getMeter("EAN1234")).thenReturn(meter);

        SimpleReading simpleReading = SimpleReading.builder()
                .value(123)
                .EAN("EAN1234")
                .build();
        when(readingService.getReadings("EAN1234")).thenReturn(List.of(simpleReading));

        HashMap<EnergyType, List<Reading>> result = portfolioService.getPortfolioConsumption(portfolio.getId());
        assertEquals(simpleReading, result.get(EnergyType.ELEC).get(0));
        assertEquals(1, result.keySet().size());
        assertEquals(1, result.get(EnergyType.ELEC).size());
    }

    @Test
    public void test_createPortfolio() throws Exception {

        PortfolioDto portfolioDto = new PortfolioDto("test", "123 Rue de Test, Test");

        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Address address = new Address("123 Rue de Test, Test", 0d, 0d);
        when(addressService.createAddress("123 Rue de Test, Test")).thenReturn(address);

        Portfolio portfolio = Portfolio.builder()
                .name(portfolioDto.getName())
                .clientId(client.getId())
                .address(address.getAddress())
                .build();

        when(portfolioRepository.insert(any(Portfolio.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Portfolio result = portfolioService.createPortfolio(portfolioDto);
        result.setId(portfolio.getId());

        assertEquals(portfolio, result);
        verify(portfolioRepository, times(1)).insert(Mockito.any(Portfolio.class));
        verify(clientService, times(1)).saveClient(any(Client.class));
    }

    @Test
    public void test_getPortfolios() throws InvalidUserDetailsException {
        Client client = new Client();
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        List<Portfolio> portfolios = new ArrayList<>();
        portfolios.add(new Portfolio());

        when(portfolioRepository.findByClientId(client.getId())).thenReturn(portfolios);

        assertEquals(portfolios, portfolioService.getPortfolios());
    }

    @Test
    public void test_createSupplyPoint() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectAlreadyExitsException, ObjectNotValidatedException, AddressesNotEqualsException {

        setUp();
        Meter meter = Meter.builder().EAN("EAN1234").build();
        when(meterService.getMeter("EAN1234")).thenReturn(meter);

        SupplyPointDto supplyPointDto = new SupplyPointDto("EAN1234", null);
        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);

        assertEquals(supplyPoint, portfolioService.createSupplyPoint(portfolio.getId(), supplyPointDto));
        assertTrue(portfolio.getSupplyPoints().contains(supplyPoint));
        verify(portfolioRepository, times(1)).save(portfolio);
    }

    @Test
    public void test_createSupplyPoint_AddressesNotEquals() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        setUp();
        Meter meter = Meter.builder().EAN("EAN1234").address("test").build();
        when(meterService.getMeter("EAN1234")).thenReturn(meter);

        SupplyPointDto supplyPointDto = new SupplyPointDto("EAN1234", null);

        assertThrows(AddressesNotEqualsException.class, () -> portfolioService.createSupplyPoint(portfolio.getId(), supplyPointDto));
    }

    @Test
    public void test_createSupplyPoint_ObjectAlreadyExists() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();
        Meter meter = Meter.builder().EAN("EAN1234").build();


        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        when(meterService.getMeter("EAN1234")).thenReturn(meter);

        SupplyPointDto supplyPointDto = new SupplyPointDto("EAN1234", null);

        assertThrows(ObjectAlreadyExitsException.class, () -> portfolioService.createSupplyPoint(portfolio.getId(), supplyPointDto));
    }

    @Test
    public void test_deleteSupplyPoint() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException, ObjectNotValidatedException {

        setUp();
        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        portfolioService.deleteSupplyPoint(portfolio.getId(), "EAN1234");

        verify(portfolioRepository, times(1)).save(portfolio);
    }

    @Test
    public void test_deleteSupplyPoint_ObjectNotFound() throws InvalidUserDetailsException {

        setUp();
        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        assertThrows(ObjectNotFoundException.class, () -> portfolioService.deleteSupplyPoint(portfolio.getId(), "EAN0000"));
    }

    @Test
    public void test_getSupplyPointConsumption() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();

        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        SimpleReading simpleReading = SimpleReading.builder()
                .value(123)
                .EAN("EAN1234")
                .build();
        when(readingService.getReadings("EAN1234")).thenReturn(List.of(simpleReading));

        List<Reading> result = portfolioService.getSupplyPointConsumption(portfolio.getId(), "EAN1234");
        assertEquals(simpleReading, result.get(0));
        assertEquals(1, result.size());
    }

    @Test
    public void test_getSupplyPointConsumption_ObjectNotFound() throws InvalidUserDetailsException {

        setUp();

        SupplyPoint supplyPoint = new SupplyPoint("EAN5678", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        assertThrows(ObjectNotFoundException.class, () -> portfolioService.getSupplyPointConsumption(portfolio.getId(), "EAN1234"));
    }
}
