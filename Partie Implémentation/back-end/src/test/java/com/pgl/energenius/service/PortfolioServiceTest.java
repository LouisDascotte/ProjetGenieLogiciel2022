package com.pgl.energenius.service;

import com.pgl.energenius.model.*;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.repository.PortfolioRepository;
import com.pgl.energenius.Exception.*;
import com.pgl.energenius.enums.EnergyType;
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
    private SecurityService securityService;

    @Mock
    private MeterService meterService;

    @Mock
    private ValidationService validationService;

    @InjectMocks
    private PortfolioService portfolioService;

    private Portfolio portfolio;

    private void setUp() throws InvalidUserDetailsException {

        // Mostly used for the getPortfolio() method
        Client client = new Client();
        PortfolioDto portfolioDto = new PortfolioDto();
        portfolio = Portfolio.builder(portfolioDto).clientId(client.getId()).build();

        when(portfolioRepository.findById(portfolio.getId())).thenReturn(Optional.of(portfolio));
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
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
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client2));
        assertThrows(UnauthorizedAccessException.class, () -> portfolioService.getPortfolio(portfolio.getId()));
    }

    @Test
    public void test_getPortfolio_InvalidUserDetails() throws InvalidUserDetailsException {

        setUp();
        when(securityService.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        assertThrows(InvalidUserDetailsException.class, () -> portfolioService.getPortfolio(portfolio.getId()));
    }

    @Test
    public void test_deletePortfolio() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();
        portfolioService.deletePortfolio(portfolio.getId());
        verify(portfolioRepository, times(1)).delete(portfolio);
    }

    @Test
    public void test_getConsumption() throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        setUp();
        Meter meter = Meter.builder().EAN("EAN1234").energyType(EnergyType.ELEC).build();

        meter.getReadings().add(new Reading(new Date(), 100));
        when(meterService.getMeter("EAN1234")).thenReturn(meter);

        SupplyPoint supplyPoint = new SupplyPoint("EAN1234", null);
        portfolio.getSupplyPoints().add(supplyPoint);

        HashMap<EnergyType, List<Reading>> expectedReadings = new HashMap<>();
        expectedReadings.put(EnergyType.ELEC, meter.getReadings());
        expectedReadings.put(EnergyType.EAU, new ArrayList<>());
        expectedReadings.put(EnergyType.GAZ, new ArrayList<>());

        HashMap<EnergyType, List<Reading>> readings = portfolioService.getPortfolioConsumption(portfolio.getId());
        assertEquals(expectedReadings, readings);
    }

    @Test
    public void test_createPortfolio() throws InvalidUserDetailsException, ObjectNotValidatedException {

        PortfolioDto portfolioDto = new PortfolioDto("test", "test");

        Client client = new Client();
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Portfolio portfolio = Portfolio.builder(portfolioDto).clientId(client.getId()).build();

        when(portfolioRepository.insert(any(Portfolio.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Portfolio result = portfolioService.createPortfolio(portfolioDto);
        result.setId(portfolio.getId());

        assertEquals(portfolio, result);
        verify(portfolioRepository, times(1)).insert(Mockito.any(Portfolio.class));
    }

    @Test
    public void test_getAllPortfolios() throws InvalidUserDetailsException {
        Client client = new Client();
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        List<Portfolio> portfolios = new ArrayList<>();
        portfolios.add(new Portfolio());

        when(portfolioRepository.findByClientId(client.getId())).thenReturn(portfolios);

        assertEquals(portfolios, portfolioService.getAllPortfolios());
    }

    @Test
    public void test_createSupplyPoint() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectAlreadyExitsException, ObjectNotValidatedException {

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
}
