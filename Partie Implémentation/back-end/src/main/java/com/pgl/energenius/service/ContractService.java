package com.pgl.energenius.service;


import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.Contract;
import com.pgl.energenius.model.Employee;
import com.pgl.energenius.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ValidationService validationService;

    public Contract insertContract(Contract contract) throws ObjectNotValidatedException {

        validationService.validate(contract);
        return contractRepository.insert(contract);
    }

    public void saveContract(Contract contract) throws ObjectNotValidatedException {

        validationService.validate(contract);
        contractRepository.save(contract);
    }

    public List<Contract> getContractsByClient(Client client) throws ObjectNotFoundException {

        List<Contract> contracts = contractRepository.findByClient(client);

        if (contracts.isEmpty()) {
            throw new ObjectNotFoundException("Contract not found with client: " + client.getFirstName() + " " + client.getLastName());
        }
        return contracts;
    }

    public List<Contract> getContractsByEmployee(Employee employee) throws ObjectNotFoundException {

        List<Contract> contracts = contractRepository.findBySupplier(employee.getSupplier());

        if (contracts.isEmpty()) {
            throw new ObjectNotFoundException("Contract not found with supplier: " + employee.getSupplier().getName());
        }
        return contracts;
    }
}
