package com.pgl.energenius.service;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.*;
import com.pgl.energenius.repository.ContractRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ContractServiceTest {

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private SecurityService securityService;

    @InjectMocks
    private ContractService contractService;

    @Test
    public void test_getContracts_Client() throws InvalidUserDetailsException {

        Contract contract = new Contract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        Client client = new Client();
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
        when(contractRepository.findByClientId(client.getId())).thenReturn(contracts);

        assertEquals(contracts, contractService.getContracts());
    }

    @Test
    public void test_getContractsByEmployee() throws InvalidUserDetailsException {

        Contract contract = new Contract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        Employee employee = Employee.builder()
                .supplier(new Supplier())
                .build();

        when(securityService.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityService.getCurrentEmployeeLogin()).thenReturn(new EmployeeLogin("", "", employee));
        when(contractRepository.findBySupplierId(employee.getSupplier().getId())).thenReturn(contracts);

        assertEquals(contracts, contractService.getContracts());
    }
}
