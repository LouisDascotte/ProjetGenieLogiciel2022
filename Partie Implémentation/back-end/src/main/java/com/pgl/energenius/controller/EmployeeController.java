package com.pgl.energenius.controller;

import com.pgl.energenius.model.dto.EmployeeLoginDto;
import com.pgl.energenius.model.EmployeeLogin;
import com.pgl.energenius.service.EmployeeService;
import com.pgl.energenius.config.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

/**
 * The EmployeeController class handles all HTTP requests related to employees
 */
@Slf4j
@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmployeeService employeeService;

    /**
     * POST method to log in the employee.
     *
     * @param employeeLoginDto The employee's login credentials.
     * @return A ResponseEntity containing the employee's login information and the authentication token.
     */
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody EmployeeLoginDto employeeLoginDto) {

        try {
            EmployeeLogin employeeLogin = employeeService.authenticateEmployee(employeeLoginDto);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(employeeLogin))
                    .body(employeeLogin.getEmployee());

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
 }
