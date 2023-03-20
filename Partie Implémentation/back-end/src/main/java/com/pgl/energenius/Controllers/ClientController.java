package com.pgl.energenius.Controllers;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/auth/register")
    @ResponseBody
    public String register(@RequestBody ClientDto clientDto) {
        Client client = new Client();
//                clientDto.getFirstName(),
//                clientDto.getLastName(),
//                clientDto.getEmail(),
//                clientDto.getPhoneNumber(), // changé pour les tests
//                clientDto.getAddress(),
//                clientDto.getCity(),
//                clientDto.getCountry(),
//                clientDto.getPostalCode(),
//                clientDto.getLanguage());
                  
                 // TODO*/

        clientRepository.save(client);
        ClientLogin clientLogin = new ClientLogin(clientDto.getEmail(),
                WebSecurityConfig.passwordEncoder().encode(clientDto.getPassword()), client);

        clientLoginRepository.save(clientLogin);

        return "Correctly done" ;
    }

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
