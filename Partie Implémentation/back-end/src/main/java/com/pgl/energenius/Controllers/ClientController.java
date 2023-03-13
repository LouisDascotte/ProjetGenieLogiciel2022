package com.pgl.energenius.Controllers;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.ClientDto;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Repositories.ClientLoginRepository;
import com.pgl.energenius.Repositories.ClientRepository;
import com.pgl.energenius.Services.ClientService;
import com.pgl.energenius.WebSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientLoginRepository clientLoginRepository;

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return new ResponseEntity<List<Client>>(clientService.allClients(), HttpStatus.OK);
    }

    @PostMapping(path = "/register", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<Client> register(ClientDto clientDto) {
        Client client = new Client(
                clientDto.getFirstName(),
                clientDto.getLastName(),
                clientDto.getPhoneNo(),
                null,
                null); // TODO

        clientRepository.save(client);

        ClientLogin clientLogin = new ClientLogin(clientDto.getEmail(),
                WebSecurityConfig.passwordEncoder().encode(clientDto.getPassword()), client);

        clientLoginRepository.save(clientLogin);

        return new ResponseEntity<>(client, HttpStatus.CREATED);
    }

    @GetMapping("/context")
    public String getCurrentUserContext() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }
}
