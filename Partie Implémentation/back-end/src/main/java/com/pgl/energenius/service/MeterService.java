package com.pgl.energenius.service;

import com.google.maps.errors.ApiException;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.*;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.notification.LinkMeterNotification;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.MeterAllocationRepository;
import com.pgl.energenius.repository.MeterRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MeterService {

    @Autowired
    private MeterRepository meterRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private MeterAllocationRepository meterAllocationRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private ValidationUtils validationUtils;

    @Autowired
    private AddressService addressService;

    @Autowired
    private ContractRepository contractRepository;

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
        List<Meter> meters = meterRepository.findBySupplierId(supplier.getId());

        return meters.stream().filter(m -> m.getEnergyType() != EnergyType.ELEC_PRODUCTION).collect(Collectors.toList());
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

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();
            return meterAllocationRepository.findByClientIdAndEAN(client.getId(), EAN);

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        return meterAllocationRepository.findBySupplierNameAndEAN(supplier.getName(), EAN);
    }

    public void deleteMeterIf_AWAITING_APPROVAL(String EAN) throws ObjectNotFoundException {

        Meter meter = meterRepository.findById(EAN)
                .orElseThrow(() -> new ObjectNotFoundException("Meter not found with EAN: " + EAN));;

        if (meter.getStatus() == Meter.Status.AWAITING_APPROVAL) {
            meterRepository.delete(meter);
        }
    }

    public Meter createMeterIfNotExistsAndCheck(String EAN, String addressStr, MeterType meterType, EnergyType energyType, HourType hourType) throws UnauthorizedAccessException, BadRequestException, ObjectNotFoundException, IOException, InterruptedException, ApiException, ObjectNotValidatedException {

        Optional<Meter> optionalMeter = meterRepository.findById(EAN);
        Meter meter;

        if (optionalMeter.isPresent()) {
            meter = optionalMeter.get();

            if (meter.getStatus() == Meter.Status.AFFECTED || meter.getStatus() == Meter.Status.AWAITING_APPROVAL) {
                throw new UnauthorizedAccessException("The meter is already affected");

            } else if (!Objects.equals(meter.getAddress(), addressService.getFormattedAddress(addressStr))) {
                throw new BadRequestException("The meter's address is not equal to the address");

            } else if (meter.getMeterType() != meterType) {
                throw new BadRequestException("The meter's meter type is not equal to the meter type");

            } else if (meter.getEnergyType() != energyType) {
                throw new BadRequestException("The meter's energy type is not equal to the energy type");

            } else if (meter.getHourType() != hourType) {
                throw new BadRequestException("The meter's hour type is not equal to the hour type");
            }

        } else {
            meter = Meter.builder()
                    .EAN(EAN)
                    .energyType(energyType)
                    .hourType(hourType)
                    .meterType(meterType)
                    .address(addressService.createAddress(addressStr).getAddress())
                    .build();
            insertMeter(meter);
        }
        return meter;
    }

    public void linkMeter(String EAN, ObjectId clientId) throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException, ObjectNotValidatedException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

        Contract contract = contractRepository.findByEAN(EAN)
                .orElseThrow(() -> new ObjectNotFoundException("Cannot link this meter because there is no contract with this meter"));

        if (contract.getStatus() == Contract.Status.PENDING) {
            throw new UnauthorizedAccessException("Cannot link this meter because the contract has not been accepted yet");

        } else if (!Objects.equals(clientId, contract.getClientId())) {
            throw new UnauthorizedAccessException("Cannot link this meter because the id of the client is not same in the contract");

        } else if (!Objects.equals(supplier.getId(), contract.getSupplierId())) {
            throw new UnauthorizedAccessException("Authenticated supplier cannot link this meter");
        }

        Meter meter = meterRepository.findById(EAN)
                .orElseThrow(() -> new ObjectNotFoundException("No meter found with ean: " + EAN));

        meter.setStatus(Meter.Status.AFFECTED);
        meter.setClientId(clientId);
        meter.setSupplierId(supplier.getId());

        saveMeter(meter);

        MeterAllocation meterAllocation = new MeterAllocation(EAN, LocalDate.now().format(DateTimeFormatter.ISO_DATE), contract.getEndDate(), clientId, supplier.getName(), MeterAllocation.Status.ACTIVE);
        meterAllocationRepository.insert(meterAllocation);

        notificationService.insertNotification(LinkMeterNotification.builder()
                .EAN(EAN)
                .senderId(supplier.getId())
                .receiverId(clientId)
                .type(Notification.Type.LINK_METER_NOTIFICATION)
                .build());
    }

    public void unlinkMeter(String EAN) throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException, ObjectNotValidatedException {

        Meter meter = getMeter(EAN);
        ObjectId clientId = meter.getClientId();
        ObjectId supplierId = meter.getSupplierId();

        meter.setSupplierId(null);
        meter.setClientId(null);
        meter.setStatus(Meter.Status.DISAFFECTED);

        saveMeter(meter);

        String dateNow = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

        MeterAllocation meterAllocation = meterAllocationRepository.findByDateAndEAN(dateNow, EAN);
        meterAllocation.setStatus(MeterAllocation.Status.ENDED);
        meterAllocation.setEndDate(dateNow);

        meterAllocationRepository.save(meterAllocation);

        notificationService.insertNotification(LinkMeterNotification.builder()
                .EAN(EAN)
                .senderId(supplierId)
                .receiverId(clientId)
                .type(Notification.Type.UNLINK_METER_NOTIFICATION)
                .build());
    }

    @Scheduled(cron = "50 23 * * ?")
    public void checkMeterAllocations() {

        String dateNow = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

        List<MeterAllocation> meterAllocations = meterAllocationRepository.findByEndDate(dateNow);

        for (MeterAllocation ma : meterAllocations) {
            ma.setStatus(MeterAllocation.Status.ENDED);

            Meter meter = meterRepository.findById(ma.getEAN()).get();
            meter.setStatus(Meter.Status.DISAFFECTED);
            meter.setClientId(null);
            meter.setSupplierId(null);
            ObjectId clientId = meter.getClientId();
            ObjectId supplierId = meter.getSupplierId();

            meter.setSupplierId(null);
            meter.setClientId(null);
            meter.setStatus(Meter.Status.DISAFFECTED);

            try {
                notificationService.insertNotification(LinkMeterNotification.builder()
                        .EAN(ma.getEAN())
                        .senderId(supplierId)
                        .receiverId(clientId)
                        .type(Notification.Type.UNLINK_METER_NOTIFICATION)
                        .build());

                saveMeter(meter);
            } catch (ObjectNotValidatedException ignored) {}
        }
    }
}
