package com.pgl.energenius.service;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.*;
import com.pgl.energenius.repository.MeterAllocationRepository;
import com.pgl.energenius.repository.MeterRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class MeterService {

    @Autowired
    private MeterRepository meterRepository;

    @Autowired
    private MeterAllocationRepository meterAllocationRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private ValidationUtils validationUtils;

    public Meter insertMeter(Meter meter) throws ObjectNotValidatedException {

        validationUtils.validate(meter);
        return meterRepository.insert(meter);
    }

    public void saveMeter(Meter meter) throws ObjectNotValidatedException {

        validationUtils.validate(meter);
        meterRepository.save(meter);
    }

    public Meter getMeter(String EAN) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Meter meter =  meterRepository.findById(EAN)
                .orElseThrow(() -> new ObjectNotFoundException("Meter not found with EAN: " + EAN));

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();

            if (client.getId().equals(meter.getClientId()))
                return meter;

            throw new UnauthorizedAccessException("Authenticated client does not own the requested meter");

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

        if (supplier.getId().equals(meter.getSupplierId()))
            return meter;

        throw new UnauthorizedAccessException("Authenticated employee does not own the requested meter");
    }

    public List<Meter> getMeters() throws InvalidUserDetailsException {

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();
            return meterRepository.findByClientId(client.getId());

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        return meterRepository.findBySupplierId(supplier.getId());
    }

    public List<String> getLinkedMetersEAN(ObjectId clientId) throws UnauthorizedAccessException, InvalidUserDetailsException {

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();

            if (!Objects.equals(client.getId(), clientId)) {
                throw new UnauthorizedAccessException("Authenticated client id is not equal to clientId.");
            }
            return meterRepository.findIdsByClientId(clientId);

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        return meterRepository.findIdsByClientIdAndSupplierId(clientId, supplier.getId());
    }

    public List<MeterAllocation> getMetersAllocations() throws InvalidUserDetailsException {

        Client client = securityUtils.getCurrentClientLogin().getClient();
        return meterAllocationRepository.findByClientId(client.getId());
    }

    public List<MeterAllocation> getMeterAllocations(String EAN) throws InvalidUserDetailsException {

        Client client = securityUtils.getCurrentClientLogin().getClient();
        return meterAllocationRepository.findByClientIdAndEAN(client.getId(), EAN);
    }
}
