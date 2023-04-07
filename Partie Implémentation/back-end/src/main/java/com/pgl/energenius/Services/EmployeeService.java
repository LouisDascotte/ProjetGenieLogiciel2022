package com.pgl.energenius.Services;

import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Objects.DTOs.EmployeeLoginDto;
import com.pgl.energenius.Objects.Employee;
import com.pgl.energenius.Objects.EmployeeLogin;
import com.pgl.energenius.Objects.notifications.Notification;
import com.pgl.energenius.Repositories.EmployeeRepository;
import com.pgl.energenius.Utils.ValidationUtils;
import com.pgl.energenius.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ValidationUtils validationUtils;

    public Employee insertEmployee(Employee employee) throws ObjectNotValidatedException {

        validationUtils.validate(employee);
        return employeeRepository.insert(employee);
    }

    public void saveEmployee(Employee employee) throws ObjectNotValidatedException {

        validationUtils.validate(employee);
        employeeRepository.save(employee);
    }

    public EmployeeLogin authenticateEmployee(EmployeeLoginDto employeeLoginDto) {

        Authentication auth = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(employeeLoginDto.getLoginId(), employeeLoginDto.getPassword()));

        return (EmployeeLogin) auth.getPrincipal();
    }
}
