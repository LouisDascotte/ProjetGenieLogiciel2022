package com.pgl.energenius.service;

import com.pgl.energenius.model.dto.EmployeeLoginDto;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.model.Employee;
import com.pgl.energenius.model.EmployeeLogin;
import com.pgl.energenius.repository.EmployeeRepository;
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
    private ValidationService validationService;

    public Employee insertEmployee(Employee employee) throws ObjectNotValidatedException {

        validationService.validate(employee);
        return employeeRepository.insert(employee);
    }

    public void saveEmployee(Employee employee) throws ObjectNotValidatedException {

        validationService.validate(employee);
        employeeRepository.save(employee);
    }

    public EmployeeLogin authenticateEmployee(EmployeeLoginDto employeeLoginDto) {

        Authentication auth = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(employeeLoginDto.getLoginId(), employeeLoginDto.getPassword()));

        return (EmployeeLogin) auth.getPrincipal();
    }
}
