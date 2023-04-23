package com.pgl.energenius.service;

import org.springframework.dao.DuplicateKeyException;
import com.pgl.energenius.enums.Lang;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.model.dto.ClientLoginDto;
import com.pgl.energenius.model.dto.ClientPreferencesDto;
import com.pgl.energenius.model.projection.ClientProjection;
import com.pgl.energenius.repository.ClientRepository;
import com.pgl.energenius.config.WebSecurityConfig;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.PortfolioRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private AddressService addressService;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private ContractRepository contractRepository;

    public Client insertClient(Client client) throws ObjectNotValidatedException {

        validationUtils.validate(client);
        return clientRepository.insert(client);
    }

    public void saveClient(Client client) throws ObjectNotValidatedException {

        validationUtils.validate(client);
        clientRepository.save(client);
    }

    public Client createClient(ClientDto clientDto) throws Exception {

        Client client = Client.builder()
                .firstName(clientDto.getFirstName())
                .lastName(clientDto.getLastName())
                .phoneNo(clientDto.getPhoneNumber())
                .address(addressService.createAddress(clientDto.getAddress()).getAddress())
                .lang(clientDto.getLang())
                .build();

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

    public Client editPreferences(ClientPreferencesDto clientPreferencesDto) throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        ClientLogin clientLogin = securityUtils.getCurrentClientLogin();
        Client client = clientLogin.getClient();
        boolean modified = false;

        if (clientPreferencesDto.getLang() != client.getLang()) {
            client.setLang(clientPreferencesDto.getLang());
            modified = true;
        }

        if (clientPreferencesDto.getNew_password() != null && WebSecurityConfig.passwordEncoder().matches(clientPreferencesDto.getOld_password(), clientLogin.getPassword())) {
            clientLogin.setPassword(WebSecurityConfig.passwordEncoder().encode(clientPreferencesDto.getNew_password()));
            userService.saveUser(clientLogin);
        }

        if (!Objects.equals(client.getFavoritePortfolioId(), clientPreferencesDto.getFavoritePortfolioId())
                && portfolioRepository.existsByIdAndClientId(clientPreferencesDto.getFavoritePortfolioId(), client.getId())) {

            client.setFavoritePortfolioId(clientPreferencesDto.getFavoritePortfolioId());
            modified = true;
        }

        if (modified) {
            saveClient(client);
        }
        return client;
    }

    public Client getClient(ObjectId clientId) throws InvalidUserDetailsException, UnauthorizedAccessException, ObjectNotFoundException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

        if (!contractRepository.existsByClientIdAndSupplierId(clientId, supplier.getId())) {
            throw new UnauthorizedAccessException("Authenticated supplier cannot access the client of id: " + clientId);
        }

        return clientRepository.findById(clientId)
                .orElseThrow(() -> new ObjectNotFoundException("No client found with id: " + clientId));
    }
}
