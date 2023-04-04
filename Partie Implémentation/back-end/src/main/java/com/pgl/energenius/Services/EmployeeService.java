package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.DTOs.EmployeeLoginDto;
import com.pgl.energenius.Objects.EmployeeLogin;
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
    private JwtUtil jwtUtil;

    public EmployeeLogin authenticateEmployee(EmployeeLoginDto employeeLoginDto) {

        Authentication auth = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(employeeLoginDto.getLoginId(), employeeLoginDto.getPassword()));

        return (EmployeeLogin) auth.getPrincipal();
    }
}
