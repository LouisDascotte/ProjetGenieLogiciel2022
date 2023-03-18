package com.pgl.energenius.Controllers;

import lombok.extern.slf4j.Slf4j;
import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.ClientDto;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.Portfolio;
import com.pgl.energenius.Repositories.ClientLoginRepository;
import com.pgl.energenius.Repositories.ClientRepository;
import com.pgl.energenius.Services.ClientService;
import com.pgl.energenius.Services.PortfolioService;
import com.pgl.energenius.WebSecurityConfig;

import org.apache.catalina.mapper.Mapper;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientLoginRepository clientLoginRepository;

    // mapping de test
    @GetMapping(path="/register")
    public String getMsg(){
        return "Test réussi";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/register", consumes = "application/json") // changé le consume (était application/x-www-form-urlencoded )
    @ResponseBody
    public String register(@RequestBody ClientDto clientDto) {
        Client client = new Client(
                clientDto.getFirstName(),
                clientDto.getLastName(),
                clientDto.getPhoneNumber(), // changé pour les tests
                clientDto.getAddress(),
                clientDto.getCity(),
                clientDto.getCountry(), 
                clientDto.getPostalCode(), 
                clientDto.getEmail(),  
                clientDto.getLanguage()); // TODO*/

        clientRepository.save(client);
        log.info("Value of : " + clientDto.getAddress());
        log.info("value of : " + clientDto.getPassword());
        ClientLogin clientLogin = new ClientLogin(clientDto.getEmail(),
                WebSecurityConfig.passwordEncoder().encode(clientDto.getPassword()), client);

        clientLoginRepository.save(clientLogin);

        return "Correctly done" ;
    }
}
