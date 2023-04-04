package com.pgl.energenius.ServiceTests;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.UnauthorizedAccessException;
import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Repositories.MeterRepository;
import com.pgl.energenius.Services.ContractService;
import com.pgl.energenius.Services.MeterService;
import com.pgl.energenius.Utils.SecurityUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
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
    private ContractService contractService;

    @InjectMocks
    private MeterService meterService;

    @Test
    public void test_getMeter_Client() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Meter meter = Meter.builder()
                .EAN("EAN1234")
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));

        Client client = new Client();

        Contract contract = Contract.builder()
                .meter1(meter)
                .build();

        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        when(contractService.getContractsByClient(client)).thenReturn(contracts);
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        assertEquals(meter, meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_Employee() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Meter meter = Meter.builder()
                .EAN("EAN1234")
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));

        Employee employee = new Employee();

        Contract contract = Contract.builder()
                .meter1(meter)
                .build();

        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        when(contractService.getContractsByEmployee(employee)).thenReturn(contracts);
        when(securityUtils.getCurrentEmployeeLogin()).thenReturn(new EmployeeLogin("", "", employee));
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);

        assertEquals(meter, meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_UnauthorizedAccess() throws ObjectNotFoundException, InvalidUserDetailsException {

        Meter meter = Meter.builder()
                .EAN("EAN1234")
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));

        Client client = new Client();

        Contract contract = new Contract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        when(contractService.getContractsByClient(client)).thenReturn(contracts);
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        assertThrows(UnauthorizedAccessException.class, () -> meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_ObjectNotFound() {

        assertThrows(ObjectNotFoundException.class, () -> meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_createReadingMeter() throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException {

        Meter meter = Meter.builder()
                .EAN("EAN1234")
                .readings(new ArrayList<>())
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));

        Client client = new Client();

        Contract contract = Contract.builder()
                .meter1(meter)
                .build();

        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        when(contractService.getContractsByClient(client)).thenReturn(contracts);
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        Reading reading = new Reading(new Date(), 123);
        assertEquals(reading, meterService.createReadingMeter("EAN1234", reading.getDate(), 123));
        verify(meterRepository, times(1)).save(meter);
    }
}
