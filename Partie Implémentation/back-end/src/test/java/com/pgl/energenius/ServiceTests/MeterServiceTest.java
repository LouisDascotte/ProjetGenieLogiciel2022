package com.pgl.energenius.ServiceTests;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Exception.UnauthorizedAccessException;
import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Objects.notifications.Notification;
import com.pgl.energenius.Repositories.MeterRepository;
import com.pgl.energenius.Services.ContractService;
import com.pgl.energenius.Services.MeterService;
import com.pgl.energenius.Services.NotificationService;
import com.pgl.energenius.Utils.SecurityUtils;
import com.pgl.energenius.Utils.ValidationUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
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
    private SecurityUtils securityUtils;

    @Mock
    private NotificationService notificationService;

    @Mock
    private ValidationUtils validationUtils;

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
        when(securityUtils.getCurrentClientLogin()).thenReturn(new ClientLogin("", "", client));
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
                .SupplierId(employee.getSupplier().getId())
                .build();

        when(meterRepository.findById("EAN1234")).thenReturn(Optional.of(meter));
        when(securityUtils.getCurrentEmployeeLogin()).thenReturn(new EmployeeLogin("", "", employee));
        when(securityUtils.getCurrentClientLogin()).thenThrow(InvalidUserDetailsException.class);

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
}
