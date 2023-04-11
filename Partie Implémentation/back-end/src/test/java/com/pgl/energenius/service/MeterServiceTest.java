package com.pgl.energenius.service;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Exception.UnauthorizedAccessException;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.repository.MeterRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MeterServiceTest {

    @Mock
    private MeterRepository meterRepository;

    @Mock
    private SecurityService securityService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private ValidationService validationService;

    @InjectMocks
    private MeterService meterService;

    private Meter meter;

    private void setUp() throws InvalidUserDetailsException {

        Client client = new Client();

        meter = Meter.builder()
                .EAN("EAN1234")
                .clientId(client.getId())
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
    }

    @Test
    public void test_getMeter_Client() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        setUp();
        assertEquals(meter, meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_Employee() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Employee employee = Employee.builder()
                .supplier(new Supplier("", ""))
                .build();

        Meter meter = Meter.builder()
                .EAN("EAN1234")
                .supplierId(employee.getSupplier().getId())
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));
        when(securityService.getCurrentEmployeeLogin()).thenReturn(new EmployeeLogin("", "", employee));
        when(securityService.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);

        assertEquals(meter, meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_UnauthorizedAccess() throws InvalidUserDetailsException {

        setUp();
        meter.setClientId(null);

        assertThrows(UnauthorizedAccessException.class, () -> meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_getMeter_ObjectNotFound() {

        assertThrows(ObjectNotFoundException.class, () -> meterService.getMeter("EAN1234"));
    }

    @Test
    public void test_createReadingMeter() throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException, ObjectNotValidatedException {

        setUp();

        Reading reading = new Reading(new Date(), 123);
        assertEquals(reading, meterService.createReadingMeter("EAN1234", reading.getDate(), 123));
        verify(meterRepository, times(1)).save(meter);
        verify(notificationService, times(1)).insertNotification(Mockito.any(Notification.class));
    }

    @Test
    public  void test_getAllMeters_Client() throws InvalidUserDetailsException, ObjectNotFoundException {

        Client client = new Client();

        meter = Meter.builder()
                .clientId(client.getId())
                .build();

        when(meterRepository.findByClientId(client.getId())).thenReturn(List.of(meter));
        when(securityService.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));

        assertEquals(meter, meterService.getAllMeters().get(0));
        verify(securityService, times(0)).getCurrentEmployeeLogin();
    }

    @Test
    public  void test_getAllMeters_Employee() throws InvalidUserDetailsException, ObjectNotFoundException {

        Employee employee = Employee.builder()
                .supplier(new Supplier())
                .build();

        meter = Meter.builder()
                .supplierId(employee.getSupplier().getId())
                .build();

        when(meterRepository.findBySupplierId(employee.getSupplier().getId())).thenReturn(List.of(meter));
        when(securityService.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);
        when(securityService.getCurrentEmployeeLogin()).thenReturn(new EmployeeLogin("", "", employee));

        assertEquals(meter, meterService.getAllMeters().get(0));
        verify(securityService, times(1)).getCurrentClientLogin();
        verify(meterRepository, times(0)).findByClientId(Mockito.any(ObjectId.class));
    }
}
