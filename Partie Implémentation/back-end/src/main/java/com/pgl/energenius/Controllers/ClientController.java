package com.pgl.energenius.Controllers;

import com.pgl.energenius.Exception.ObjectAlreadyExitsException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.DTOs.ClientDto;
import com.pgl.energenius.Objects.DTOs.ClientLoginDto;
import com.pgl.energenius.Services.ClientService;
import com.pgl.energenius.config.JwtUtil;
import jakarta.validation.Valid;
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
    private JwtUtil jwtUtil;

    /**
     * POST method to register a new client.
     *
     * @param clientDto The client's information.
     * @return A message indicating that the registration has been successfully completed.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody ClientDto clientDto) {

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
    public ResponseEntity<?> login(@Valid @RequestBody ClientLoginDto clientLoginDto) {

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
}
