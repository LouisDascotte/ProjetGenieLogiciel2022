package com.pgl.energenius.Services;


import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Contract;
import com.pgl.energenius.Objects.Employee;
import com.pgl.energenius.Repositories.ContractRepository;
import com.pgl.energenius.Utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ValidationUtils validationUtils;

    public Contract insertContract(Contract contract) throws ObjectNotValidatedException {

        validationUtils.validate(contract);
        return contractRepository.insert(contract);
    }

    public void saveContract(Contract contract) throws ObjectNotValidatedException {

        validationUtils.validate(contract);
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
