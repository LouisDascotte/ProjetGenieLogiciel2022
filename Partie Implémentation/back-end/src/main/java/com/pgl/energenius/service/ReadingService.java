package com.pgl.energenius.service;

import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.Meter;
import com.pgl.energenius.model.MeterAllocation;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.notification.ReadingNotification;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.repository.ReadingRepository;
import com.pgl.energenius.utils.DateUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReadingService {

    @Autowired
    private MeterService meterService;

    @Autowired
    private ValidationUtils validationUtils;

    @Autowired
    private ReadingRepository readingRepository;

    @Autowired
    private NotificationService notificationService;

    public Reading insertReading(Reading reading) throws ObjectNotValidatedException {

        validationUtils.validate(reading);
        return readingRepository.insert(reading);
    }

    public void saveReading(Reading reading) throws ObjectNotValidatedException {

        validationUtils.validate(reading);
        readingRepository.save(reading);
    }

    public SimpleReading createSimpleReading(String EAN, String date, int value, boolean overwrite) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException, ObjectAlreadyExitsException, DateFormatException {

        DateUtils.validateDateFormat(date);
        Meter meter = meterService.getMeter(EAN);

        if (meter.getHourType() != HourType.SIMPLE) {
            throw new UnauthorizedAccessException("Cannot add a SimpleReading for a meter that is double");
        }

        SimpleReading reading = SimpleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.PENDING)
                .value(value)
                .build();

        try {
            insertReading(reading);

        } catch (DuplicateKeyException e) {

            if (overwrite) {
                reading = (SimpleReading) readingRepository.findByEANAndDate(EAN, date);
                reading.setValue(value);
                reading.setStatus(Reading.Status.PENDING);
                saveReading(reading);

            } else {
                throw new ObjectAlreadyExitsException("Reading already exits with date: " + date);
            }
        }

        ReadingNotification notification = ReadingNotification.builder()
                .senderId(meter.getClientId())
                .type(Notification.Type.READING_NOTIFICATION)
                .reading(reading)
                .EAN(meter.getEAN())
                .receiverId(meter.getSupplierId())
                .build();

        notificationService.insertNotification(notification);
        return reading;
    }

    public DoubleReading createDoubleReading(String EAN, String date, int dayValue, int nightValue, boolean overwrite) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException, ObjectAlreadyExitsException, DateFormatException {

        DateUtils.validateDateFormat(date);
        Meter meter = meterService.getMeter(EAN);

        if (meter.getHourType() != HourType.DOUBLE) {
            throw new UnauthorizedAccessException("Cannot add a DoubleReading for a meter that is simple");
        }

        DoubleReading reading = DoubleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.PENDING)
                .dayValue(dayValue)
                .nightValue(nightValue)
                .build();

        try {
            insertReading(reading);

        } catch (DuplicateKeyException e) {

            if (overwrite) {
                reading = (DoubleReading) readingRepository.findByEANAndDate(EAN, date);
                reading.setDayValue(dayValue);
                reading.setNightValue(nightValue);
                reading.setStatus(Reading.Status.PENDING);
                saveReading(reading);

            } else {
                throw new ObjectAlreadyExitsException("Reading already exits with date: " + date);
            }
        }

        ReadingNotification notification = ReadingNotification.builder()
                .senderId(meter.getClientId())
                .type(Notification.Type.READING_NOTIFICATION)
                .reading(reading)
                .EAN(meter.getEAN())
                .receiverId(meter.getSupplierId())
                .build();

        notificationService.insertNotification(notification);
        return reading;
    }

    public List<Reading> getReadingsByDateBetween(String beginDate, String endDate, String EAN) {
        return readingRepository.findByDateBetweenAndEAN(beginDate, endDate, EAN);
    }

    public List<Reading> getReadings(String EAN) throws InvalidUserDetailsException {

        List<MeterAllocation> meterAllocations = meterService.getMeterAllocations(EAN);
        List<Reading> readings = new ArrayList<>();

        for (MeterAllocation ma : meterAllocations) {
            readings.addAll(getReadingsByDateBetween(ma.getBeginDate(), ma.getEndDate(), EAN));
        }
        return readings;
    }
}
