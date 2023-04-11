package com.pgl.energenius.service;

import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.Contract;
import com.pgl.energenius.model.Employee;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.repository.ContractRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ContractServiceTest {

    @Mock
    private ContractRepository contractRepository;

    @InjectMocks
    private ContractService contractService;

    @Test
    public void test_getContractsByClient() throws ObjectNotFoundException {

        Contract contract = new Contract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        Client client = new Client();
        when(contractRepository.findByClient(client)).thenReturn(contracts);

        assertEquals(contracts, contractService.getContractsByClient(client));
    }

    @Test
    public void test_getContractsByClient_ObjectNotFound() {

        List<Contract> contracts = new ArrayList<>();
        Client client = new Client();
        when(contractRepository.findByClient(client)).thenReturn(contracts);

        assertThrows(ObjectNotFoundException.class, () -> contractService.getContractsByClient(client));
    }

    @Test
    public void test_getContractsByEmployee() throws ObjectNotFoundException {

        Contract contract = new Contract();
        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract);

        Employee employee = Employee.builder()
                .supplier(new Supplier())
                .build();

        when(contractRepository.findBySupplier(employee.getSupplier())).thenReturn(contracts);

        assertEquals(contracts, contractService.getContractsByEmployee(employee));
    }

    @Test
    public void test_getContractsByEmployee_ObjectNotFound() {

        List<Contract> contracts = new ArrayList<>();

        Employee employee = Employee.builder()
                .supplier(new Supplier())
                .build();

        when(contractRepository.findBySupplier(employee.getSupplier())).thenReturn(contracts);

        assertThrows(ObjectNotFoundException.class, () -> contractService.getContractsByEmployee(employee));
    }
}
