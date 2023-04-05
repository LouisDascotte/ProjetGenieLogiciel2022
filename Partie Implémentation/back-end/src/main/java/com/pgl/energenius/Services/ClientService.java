package com.pgl.energenius.Services;

import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.Exception.ObjectAlreadyExitsException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.DTOs.ClientDto;
import com.pgl.energenius.Objects.DTOs.ClientLoginDto;
import com.pgl.energenius.Objects.notifications.Notification;
import com.pgl.energenius.Repositories.ClientRepository;
import com.pgl.energenius.Repositories.UserRepository;
import com.pgl.energenius.Utils.ValidationUtils;
import com.pgl.energenius.config.WebSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * This class provides services related to ClientRepository.
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private ValidationUtils validationUtils;

    public Client insertClient(Client client) throws ObjectNotValidatedException {

        validationUtils.validate(client);
        return clientRepository.insert(client);
    }

    public void saveClient(Client client) throws ObjectNotValidatedException {

        validationUtils.validate(client);
        clientRepository.save(client);
    }

    public Client createClient(ClientDto clientDto) throws ObjectAlreadyExitsException, ObjectNotValidatedException {

        Client client = Client.builder(clientDto).build();

        ClientLogin clientLogin = new ClientLogin(clientDto.getEmail(),
                WebSecurityConfig.passwordEncoder().encode(clientDto.getPassword()), client);

        try {
            userService.insertUser(clientLogin);

        } catch (DuplicateKeyException e) {
            throw new ObjectAlreadyExitsException("A ClientLogin already exists with email: " + clientDto.getEmail());
        }

        return insertClient(client);
    }

    public ClientLogin authenticateClient(ClientLoginDto clientLoginDto) throws BadCredentialsException {

        Authentication auth = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(clientLoginDto.getEmail(), clientLoginDto.getPassword()));

        return (ClientLogin) auth.getPrincipal();
    }
}
