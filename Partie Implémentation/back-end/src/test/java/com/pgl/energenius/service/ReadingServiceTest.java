package com.pgl.energenius.service;

import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.Meter;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.repository.ReadingRepository;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ReadingServiceTest {

    @InjectMocks
    private ReadingService readingService;

    @Mock
    private ReadingRepository readingRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private MeterService meterService;

    @Mock
    private ValidationUtils validationUtils;

    @Test
    public void test_createSimpleReading() throws ObjectNotValidatedException, ObjectAlreadyExitsException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, DateFormatException {

        String date = "2023-12-31";
        String EAN = "123";
        int value = 123;

        Meter meter = Meter.builder()
                .hourType(Meter.HourType.SIMPLE)
                .EAN(EAN)
                .clientId(new ObjectId())
                .supplierId(new ObjectId())
                .build();
        when(meterService.getMeter(EAN)).thenReturn(meter);

        SimpleReading reading = SimpleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.PENDING)
                .value(value)
                .build();

        assertEquals(reading, readingService.createSimpleReading(EAN, date, value, false));
        verify(notificationService, times(1)).insertNotification(Mockito.any(Notification.class));
    }

    @Test
    public void test_createSimpleReading_ObjectAlreadyExists() throws ObjectNotValidatedException, ObjectAlreadyExitsException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, DateFormatException {

        String date = "2023-12-31";
        String EAN = "123";
        int value = 123;

        Meter meter = Meter.builder()
                .hourType(Meter.HourType.SIMPLE)
                .EAN(EAN)
                .clientId(new ObjectId())
                .supplierId(new ObjectId())
                .build();
        when(meterService.getMeter(EAN)).thenReturn(meter);

        SimpleReading reading = SimpleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.PENDING)
                .value(value)
                .build();

        when(readingRepository.insert(reading)).thenThrow(DuplicateKeyException.class);
        assertThrows(ObjectAlreadyExitsException.class, () -> readingService.createSimpleReading(EAN, date, value, false));


        SimpleReading readingInDB = SimpleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.ACCEPTED)
                .value(111)
                .build();

        when(readingRepository.findByEANAndDate(EAN, date)).thenReturn(readingInDB);

        assertEquals(reading, readingService.createSimpleReading(EAN, date, value, true));
        verify(notificationService, times(1)).insertNotification(Mockito.any(Notification.class));
    }

    @Test
    public void test_createDoubleReading() throws ObjectNotValidatedException, ObjectAlreadyExitsException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, DateFormatException {

        String date = "2023-12-31";
        String EAN = "123";
        int dayValue = 123;
        int nightValue = 456;

        Meter meter = Meter.builder()
                .hourType(Meter.HourType.DOUBLE)
                .EAN(EAN)
                .clientId(new ObjectId())
                .supplierId(new ObjectId())
                .build();
        when(meterService.getMeter(EAN)).thenReturn(meter);

        DoubleReading reading = DoubleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.PENDING)
                .dayValue(dayValue)
                .nightValue(nightValue)
                .build();

        assertEquals(reading, readingService.createDoubleReading(EAN, date, dayValue, nightValue, false));
        verify(notificationService, times(1)).insertNotification(Mockito.any(Notification.class));
    }

    @Test
    public void test_createDoubleReading_ObjectAlreadyExists() throws ObjectNotValidatedException, ObjectAlreadyExitsException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, DateFormatException {

        String date = "2023-12-31";
        String EAN = "123";
        int dayValue = 123;
        int nightValue = 456;

        Meter meter = Meter.builder()
                .hourType(Meter.HourType.DOUBLE)
                .EAN(EAN)
                .clientId(new ObjectId())
                .supplierId(new ObjectId())
                .build();
        when(meterService.getMeter(EAN)).thenReturn(meter);

        DoubleReading reading = DoubleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.PENDING)
                .dayValue(dayValue)
                .nightValue(nightValue)
                .build();

        when(readingRepository.insert(reading)).thenThrow(DuplicateKeyException.class);
        assertThrows(ObjectAlreadyExitsException.class, () -> readingService.createDoubleReading(EAN, date, dayValue, nightValue, false));


        DoubleReading readingInDB = DoubleReading.builder()
                .EAN(EAN)
                .date(date)
                .status(Reading.Status.ACCEPTED)
                .dayValue(111)
                .nightValue(222)
                .build();

        when(readingRepository.findByEANAndDate(EAN, date)).thenReturn(readingInDB);

        assertEquals(reading, readingService.createDoubleReading(EAN, date, dayValue, nightValue, true));
        verify(notificationService, times(1)).insertNotification(Mockito.any(Notification.class));
    }
}
