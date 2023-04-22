package com.pgl.energenius.controller;


import com.pgl.energenius.config.JwtUtil;
import com.pgl.energenius.exception.ObjectAlreadyExitsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.model.dto.ClientLoginDto;
import com.pgl.energenius.model.dto.SupplierLoginDto;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.repository.ReadingRepository;
import com.pgl.energenius.service.ClientService;
import com.pgl.energenius.service.SupplierService;
import com.pgl.energenius.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private SupplierService supplierService;


    @Autowired
    private ReadingRepository readingRepository;

    @GetMapping("/test")
    public Reading test() {
        return readingRepository.insert(DoubleReading.builder()
                        .status(Reading.Status.ACCEPTED)
                        .EAN("123")
                        .dayValue(123)
                        .nightValue(234)
                        .date("2023-04-22")
                        .build());
    }

    

    /**
     * POST method to register a new client.
     *
     * @param clientDto The client's information.
     * @return A message indicating that the registration has been successfully completed.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/client/register")
    public ResponseEntity<?> register(@RequestBody ClientDto clientDto) {

        try {
            return new ResponseEntity<>(clientService.createClient(clientDto), HttpStatus.CREATED);

        } catch (ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST method to log in the client.
     *
     * @param clientLoginDto The client's login credentials.
     * @return A ResponseEntity containing the client's login information and the authentication token.
     */
    @PostMapping("/client/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> login(@RequestBody ClientLoginDto clientLoginDto) {

        try {
            ClientLogin clientLogin = clientService.authenticateClient(clientLoginDto);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(clientLogin))
                    .body(clientLogin.getClient().getId());

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/client/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email) {

        try {
            userService.resetPasswordClient(email, jwtUtil.generatePasswordResetToken(email));
            return ResponseEntity.ok().body("Email sent");

        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Couldn't send an email to this email: " + email);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/client/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String newPassword, @RequestParam String token) {

        try {
            if (!jwtUtil.validatePasswordResetToken(token))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");

            userService.changePasswordClient(jwtUtil.getUsernameFromToken(token), newPassword);
            return ResponseEntity.ok().build();

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST method to log in the employee.
     *
     * @param supplierLoginDto The employee's login credentials.
     * @return A ResponseEntity containing the employee's login information and the authentication token.
     */
    @PostMapping("/employee/login")
    public ResponseEntity<?> login(@RequestBody SupplierLoginDto supplierLoginDto) {

        try {
            SupplierLogin supplierLogin = supplierService.authenticateSupplier(supplierLoginDto);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(supplierLogin))
                    .body(supplierLogin.getSupplier());

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
