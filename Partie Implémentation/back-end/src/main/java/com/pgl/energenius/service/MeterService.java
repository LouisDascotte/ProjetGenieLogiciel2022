package com.pgl.energenius.service;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.notification.ReadingNotification;
import com.pgl.energenius.repository.MeterRepository;
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
    private NotificationService notificationService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private ValidationService validationService;

    public Meter insertMeter(Meter meter) throws ObjectNotValidatedException {

        validationService.validate(meter);
        return meterRepository.insert(meter);
    }

    public void saveMeter(Meter meter) throws ObjectNotValidatedException {

        validationService.validate(meter);
        meterRepository.save(meter);
    }

    public Meter getMeter(String EAN) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Meter meter =  meterRepository.findById(EAN)
                .orElseThrow(() -> new ObjectNotFoundException("Meter not found with EAN: " + EAN));

        try {
            Client client = securityService.getCurrentClientLogin().getClient();

            if (client.getId().equals(meter.getClientId()))
                return meter;

            throw new UnauthorizedAccessException("Authenticated client does not own the requested meter");

        } catch (InvalidUserDetailsException ignored) {}

        Employee employee = securityService.getCurrentEmployeeLogin().getEmployee();

        if (employee.getSupplier().getId().equals(meter.getSupplierId()))
            return meter;

        throw new UnauthorizedAccessException("Authenticated employee does not own the requested meter");
    }

    public Reading createReadingMeter(String EAN, Date date, int value) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException {

        Meter meter = getMeter(EAN);

        Reading reading = new Reading(date, value);
        meter.getReadings().add(reading); // TODO verifier la date des autres ?

        ReadingNotification notification = ReadingNotification.builder()
                .senderId(meter.getClientId())
                .type(Notification.Type.READING_NOTIFICATION)
                .reading(reading)
                .meter(meter)
                .build();

        saveMeter(meter);
        notificationService.insertNotification(notification);
        return reading;
    }

    public List<Meter> getAllMeters() throws ObjectNotFoundException, InvalidUserDetailsException {

        try {
            Client client = securityService.getCurrentClientLogin().getClient();
            return meterRepository.findByClientId(client.getId());

        } catch (InvalidUserDetailsException ignored) {}

        Employee employee = securityService.getCurrentEmployeeLogin().getEmployee();
        return meterRepository.findBySupplierId(employee.getSupplier().getId());
    }
}
