package com.pgl.energenius.Controllers;

import com.pgl.energenius.Objects.DTOs.ClientLoginDto;
import com.pgl.energenius.Objects.DTOs.EmployeeLoginDto;
import com.pgl.energenius.Objects.EmployeeLogin;
import com.pgl.energenius.Repositories.UserRepository;
import com.pgl.energenius.config.JwtUtil;
import com.pgl.energenius.config.WebSecurityConfig;
import lombok.extern.slf4j.Slf4j;
import com.pgl.energenius.Objects.ClientLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    /**
     * POST method to log in the employee.
     *
     * @param employeeLoginDto The employee's login credentials.
     * @return A ResponseEntity containing the employee's login information and the authentication token.
     */
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody EmployeeLoginDto employeeLoginDto) {
        System.out.println("ok");
        try {
            Authentication auth = authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(employeeLoginDto.getLoginId(), employeeLoginDto.getPassword()));

            System.out.println("ok");
            EmployeeLogin employeeLogin = (EmployeeLogin) auth.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(employeeLogin)
                    ).body(employeeLogin);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
 }
