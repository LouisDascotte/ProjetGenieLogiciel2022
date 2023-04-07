package com.pgl.energenius.Services;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Exception.UnauthorizedAccessException;
import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Objects.notifications.Notification;
import com.pgl.energenius.Objects.notifications.ReadingNotification;
import com.pgl.energenius.Repositories.MeterRepository;
import com.pgl.energenius.Utils.SecurityUtils;
import com.pgl.energenius.Utils.ValidationUtils;
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

        Employee employee = securityUtils.getCurrentEmployeeLogin().getEmployee();

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
            Client client = securityUtils.getCurrentClientLogin().getClient();
            return meterRepository.findByClientId(client.getId());

        } catch (InvalidUserDetailsException ignored) {}

        Employee employee = securityUtils.getCurrentEmployeeLogin().getEmployee();
        return meterRepository.findBySupplierId(employee.getSupplier().getId());
    }
}
