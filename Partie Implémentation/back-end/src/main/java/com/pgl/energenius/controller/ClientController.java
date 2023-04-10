package com.pgl.energenius.controller;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectAlreadyExitsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.model.dto.ClientLoginDto;
import com.pgl.energenius.service.ClientService;
import com.pgl.energenius.service.UserService;
import com.pgl.energenius.config.JwtUtil;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

/**
 * The ClientController class handles all HTTP requests related to Clients
 */
@Slf4j
@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * POST method to register a new client.
     *
     * @param clientDto The client's information.
     * @return A message indicating that the registration has been successfully completed.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/auth/register")
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
    @PostMapping("/auth/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> login(@RequestBody ClientLoginDto clientLoginDto) {

        try {
            ClientLogin clientLogin = clientService.authenticateClient(clientLoginDto);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(clientLogin))
                    .body(clientLogin.getClient().getId().toString());

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/infos")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getClient() {

        try {
            return new ResponseEntity<>(clientService.getAuthClient(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/auth/reset-password")
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

    @PostMapping("/auth/change-password")
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
}
