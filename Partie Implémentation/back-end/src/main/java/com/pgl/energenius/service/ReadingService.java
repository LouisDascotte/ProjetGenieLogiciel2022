package com.pgl.energenius.service;

import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
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
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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

    @Autowired
    private MongoTemplate mongoTemplate;

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

        if (meter.getMeterType() == MeterType.NUMERIC) {
            throw new UnauthorizedAccessException("Cannot add a SimpleReading for a meter that is numeric");

        } else if (meter.getHourType() != HourType.SIMPLE) {
            throw new UnauthorizedAccessException("Cannot add a SimpleReading for a meter that is double");
        }

        SimpleReading reading = SimpleReading.builder()
                .EAN(EAN)
                .date(date)
                .value(value)
                .build();

        try {
            insertReading(reading);

        } catch (DuplicateKeyException e) {

            if (overwrite) {
                reading = (SimpleReading) readingRepository.findByEANAndDate(EAN, date).get();
                reading.setValue(value);
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

        if (meter.getMeterType() == MeterType.NUMERIC) {
            throw new UnauthorizedAccessException("Cannot add a DoubleReading for a meter that is numeric");

        } else if (meter.getHourType() != HourType.DOUBLE) {
            throw new UnauthorizedAccessException("Cannot add a DoubleReading for a meter that is simple");
        }

        DoubleReading reading = DoubleReading.builder()
                .EAN(EAN)
                .date(date)
                .dayValue(dayValue)
                .nightValue(nightValue)
                .build();

        try {
            insertReading(reading);

        } catch (DuplicateKeyException e) {

            if (overwrite) {
                reading = (DoubleReading) readingRepository.findByEANAndDate(EAN, date).get();
                reading.setDayValue(dayValue);
                reading.setNightValue(nightValue);
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
        return getReadings(meterAllocations, EAN);
    }

    public List<Reading> getReadingsClient(String EAN, ObjectId clientId) {

        List<MeterAllocation> meterAllocations = meterService.getMeterAllocationsClient(EAN, clientId);
        return getReadings(meterAllocations, EAN);
    }

    private List<Reading> getReadings(List<MeterAllocation> meterAllocations, String EAN) {

        List<Reading> readings = new ArrayList<>();

        for (MeterAllocation ma : meterAllocations) {
            readings.addAll(getReadingsByDateBetween(ma.getBeginDate(), ma.getEndDate(), EAN));
        }
        return readings;
    }

    public void deleteReading(ObjectId readingId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException {

        Reading reading = readingRepository.findById(readingId)
                .orElseThrow(() -> new ObjectNotFoundException("No reading found with id: " + readingId));

        Meter meter = meterService.getMeter(reading.getEAN());
        readingRepository.delete(reading);

        Notification notification = Notification.builder()
                .type(Notification.Type.READING_REJECTED_NOTIFICATION)
                .senderId(meter.getSupplierId())
                .receiverId(meter.getClientId())
                .build();
        notificationService.insertNotification(notification);
    }

    public void editSimpleReading(ObjectId readingId, int value) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, BadRequestException, ObjectNotValidatedException {

        Reading reading = readingRepository.findById(readingId)
                .orElseThrow(() -> new ObjectNotFoundException("No reading found with id: " + readingId));

        Meter meter = meterService.getMeter(reading.getEAN());

        if (!(reading instanceof SimpleReading simpleReading)) {
            throw new BadRequestException("Cannot edit a double reading in this endpoint");
        }

        simpleReading.setValue(value);
        saveReading(simpleReading);

        Notification notification = Notification.builder()
                .type(Notification.Type.READING_MODIFIED_NOTIFICATION)
                .senderId(meter.getSupplierId())
                .receiverId(meter.getClientId())
                .build();
        notificationService.insertNotification(notification);
    }

    public void editDoubleReading(ObjectId readingId, int dayValue, int nightValue) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, BadRequestException, ObjectNotValidatedException {

        Reading reading = readingRepository.findById(readingId)
                .orElseThrow(() -> new ObjectNotFoundException("No reading found with id: " + readingId));

        Meter meter = meterService.getMeter(reading.getEAN());

        if (!(reading instanceof DoubleReading doubleReading)) {
            throw new BadRequestException("Cannot edit a simple reading in this endpoint");
        }

        doubleReading.setDayValue(dayValue);
        doubleReading.setNightValue(nightValue);
        saveReading(doubleReading);

        Notification notification = Notification.builder()
                .type(Notification.Type.READING_MODIFIED_NOTIFICATION)
                .senderId(meter.getSupplierId())
                .receiverId(meter.getClientId())
                .build();
        notificationService.insertNotification(notification);
    }

    public Reading findLastReading(String EAN) {

        Query query = new Query().addCriteria(Criteria.where("EAN").is(EAN));
        query.limit(1);
        query.with(Sort.by(Sort.Direction.DESC, "date"));

        return mongoTemplate.findOne(query, Reading.class);
    }
}
