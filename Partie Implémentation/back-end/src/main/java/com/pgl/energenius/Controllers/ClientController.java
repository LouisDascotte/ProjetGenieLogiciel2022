package com.pgl.energenius.Controllers;

import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.Objects.Address;
import com.pgl.energenius.Objects.DTOs.ClientLoginDto;
import com.pgl.energenius.config.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.DTOs.ClientDto;
import com.pgl.energenius.Repositories.ClientLoginRepository;
import com.pgl.energenius.Repositories.ClientRepository;
import com.pgl.energenius.config.WebSecurityConfig;
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
 * The ClientController class handles all HTTP requests related to Clients
 */
@Slf4j
@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientLoginRepository clientLoginRepository;

    @Autowired
    private AuthenticationProvider authenticationProvider;

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

        Address address = new Address(clientDto.getCity(),
                clientDto.getStreet(),
                clientDto.getHouseNo(),
                clientDto.getBox(),
                clientDto.getPostalCode(),
                clientDto.getCountry());

        Client client = new Client(clientDto.getFirstName(),
                clientDto.getLastName(),
                clientDto.getPhoneNumber(),
                address,
                null);

        ClientLogin clientLogin = new ClientLogin(clientDto.getEmail(),
                WebSecurityConfig.passwordEncoder().encode(clientDto.getPassword()), client);

        if (clientLoginRepository.existsById(clientDto.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        clientLoginRepository.insert(clientLogin);
        clientRepository.insert(client);
        return new ResponseEntity<>(client, HttpStatus.CREATED);
    }

    /**
     * POST method to log in the client.
     *
     * @param clientLoginDto The client's login credentials.
     * @return A ResponseEntity containing the client's login information and the authentication token.
     */
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody ClientLoginDto clientLoginDto) {

        try {
            Authentication auth = authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(clientLoginDto.getEmail(), clientLoginDto.getPassword()));

            ClientLogin clientLogin = (ClientLogin) auth.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(clientLogin)
                    ).body(clientLogin);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
