package com.pgl.energenius.service;


import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
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

    @Autowired
    private SecurityService securityService;

    public Contract insertContract(Contract contract) throws ObjectNotValidatedException {

        validationService.validate(contract);
        return contractRepository.insert(contract);
    }

    public void saveContract(Contract contract) throws ObjectNotValidatedException {

        validationService.validate(contract);
        contractRepository.save(contract);
    }

    public List<Contract> getContracts() throws InvalidUserDetailsException {

        try {
            Client client = securityService.getCurrentClientLogin().getClient();
            return contractRepository.findByClientId(client.getId());

        } catch (InvalidUserDetailsException ignored) {}

        Employee employee = securityService.getCurrentEmployeeLogin().getEmployee();
        return contractRepository.findBySupplierId(employee.getSupplier().getId());
    }


}
