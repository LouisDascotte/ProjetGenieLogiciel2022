package com.pgl.energenius.Services;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.UnauthorizedAccessException;
import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Repositories.MeterRepository;
import com.pgl.energenius.Utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MeterService {

    @Autowired
    private MeterRepository meterRepository;

    @Autowired
    private ContractService contractService;

    @Autowired
    private SecurityUtils securityUtils;

    public Meter getMeter(String EAN) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Meter meter =  meterRepository.findById(EAN)
                .orElseThrow(() -> new ObjectNotFoundException("Meter not found with EAN: " + EAN));

        List<Contract> contracts = null;
        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();
            contracts = contractService.getContractsByClient(client);

        } catch (InvalidUserDetailsException ignored) {}

        if (contracts == null) {
            Employee employee = securityUtils.getCurrentEmployeeLogin().getEmployee();
            contracts = contractService.getContractsByEmployee(employee);
        }

        for (Contract contract : contracts) {

            if (meter.equals(contract.getMeter1()) || meter.equals(contract.getMeter2())) {
                return meter;
            }
        }
        throw new UnauthorizedAccessException("Authenticated client or employee does not own the requested meter");
    }

    public Reading createReadingMeter(String EAN, Date date, int value) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Meter meter = getMeter(EAN);

        Reading reading = new Reading(date, value);
        meter.getReadings().add(reading); // TODO verifier la date des autres ?

        // TODO Envoyer une notification au supplier.

        meterRepository.save(meter);
        return reading;
    }
}
