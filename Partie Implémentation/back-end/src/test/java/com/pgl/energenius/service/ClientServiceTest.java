package com.pgl.energenius.service;


import com.pgl.energenius.config.WebSecurityConfig;
import com.pgl.energenius.enums.Lang;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.model.dto.ClientPreferencesDto;
import com.pgl.energenius.repository.ClientRepository;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.PortfolioRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DuplicateKeyException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private UserService userService;

    @Mock
    private ValidationUtils validationUtils;

    @Mock
    private AddressService addressService;

    @Mock
    private SecurityUtils securityUtils;

    @Mock
    private PortfolioRepository portfolioRepository;

    @Mock
    private ContractRepository contractRepository;

    @InjectMocks
    private ClientService clientService;

    @Test
    public void test_createClient() throws Exception {

        ClientDto clientDto = ClientDto.builder()
                .firstName("test")
                .password("test")
                .address("123 Rue de Test, Test")
                .build();

        when(clientRepository.insert(any(Client.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Address address = new Address("123 Rue de Test, Test", 0d, 0d);
        when(addressService.createAddress("123 Rue de Test, Test")).thenReturn(address);

        Client client = Client.builder()
                .firstName(clientDto.getFirstName())
                .address(address.getAddress())
                .build();

        Client result = clientService.createClient(clientDto);
        result.setId(client.getId());

        assertEquals(client, result);
        verify(userService, times(1)).insertUser(any(ClientLogin.class));
    }

    @Test
    public void test_createClient_ObjectAlreadyExits() throws Exception {

        Address address = new Address("123 Rue de Test, Test", 0d, 0d);
        when(addressService.createAddress("123 Rue de Test, Test")).thenReturn(address);

        ClientDto clientDto = ClientDto.builder()
                .password("test")
                .address(address.getAddress())
                .build();

        when(userService.insertUser(any(ClientLogin.class))).thenThrow(DuplicateKeyException.class);
        assertThrows(ObjectAlreadyExitsException.class, () -> clientService.createClient(clientDto));
    }

    @Test
    public void test_editPreferences_password() throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        Client client = new Client();
        ClientLogin clientLogin = new ClientLogin("", WebSecurityConfig.passwordEncoder().encode("password"), client);
        when(securityUtils.getCurrentClientLogin()).thenReturn(clientLogin);

        ClientPreferencesDto clientPreferencesDto = new ClientPreferencesDto(null, "password", "newPassword", null);

        clientService.editPreferences(clientPreferencesDto);

        verify(userService, times(1)).saveUser(any(ClientLogin.class));
        assertTrue(WebSecurityConfig.passwordEncoder().matches("newPassword", clientLogin.getPassword()));
        verify(clientRepository, times(0)).save(any(Client.class));
    }

    @Test
    public void test_editPreferences_lang() throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        Client client = Client.builder().lang(Lang.FR).build();
        ClientLogin clientLogin = new ClientLogin("", "", client);
        when(securityUtils.getCurrentClientLogin()).thenReturn(clientLogin);

        ClientPreferencesDto clientPreferencesDto = new ClientPreferencesDto(Lang.EN, null, null, null);

        clientService.editPreferences(clientPreferencesDto);

        assertEquals(Lang.EN, client.getLang());
        verify(userService, times(0)).saveUser(any(ClientLogin.class));
        verify(clientRepository, times(1)).save(any(Client.class));
    }

    @Test
    public void test_editPreferences_favoritePortfolio() throws InvalidUserDetailsException, ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException {

        Client client = Client.builder().favoritePortfolioId(new ObjectId()).build();
        ClientLogin clientLogin = new ClientLogin("", "", client);
        when(securityUtils.getCurrentClientLogin()).thenReturn(clientLogin);

        ClientPreferencesDto clientPreferencesDto = new ClientPreferencesDto(null, null, null, new ObjectId());
        when(portfolioRepository.existsByIdAndClientId(clientPreferencesDto.getFavoritePortfolioId(), client.getId())).thenReturn(true);

        clientService.editPreferences(clientPreferencesDto);

        assertEquals(clientPreferencesDto.getFavoritePortfolioId(), client.getFavoritePortfolioId());
        verify(userService, times(0)).saveUser(any(ClientLogin.class));
        verify(clientRepository, times(1)).save(any(Client.class));
    }

    @Test
    public void test_getClient() throws InvalidUserDetailsException, UnauthorizedAccessException, ObjectNotFoundException {

        Client client = new Client();
        Supplier supplier = new Supplier();
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        when(contractRepository.existsByClientIdAndSupplierId(client.getId(), supplier.getId())).thenReturn(true);
        when(clientRepository.findById(client.getId())).thenReturn(Optional.of(client));

        assertEquals(client, clientService.getClient(client.getId()));
    }

    @Test
    public void test_getClient_NoContracts() throws InvalidUserDetailsException {

        Client client = new Client();
        Supplier supplier = new Supplier();
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        when(contractRepository.existsByClientIdAndSupplierId(client.getId(), supplier.getId())).thenReturn(false);

        assertThrows(UnauthorizedAccessException.class, () -> clientService.getClient(client.getId()));
    }

    @Test
    public void test_getClient_ObjectNotFound() throws InvalidUserDetailsException {

        Client client = new Client();
        Supplier supplier = new Supplier();
        when(securityUtils.getCurrentSupplierLogin()).thenReturn(new SupplierLogin("", "", supplier));

        when(contractRepository.existsByClientIdAndSupplierId(client.getId(), supplier.getId())).thenReturn(true);
        when(clientRepository.findById(client.getId())).thenReturn(Optional.empty());

        assertThrows(ObjectNotFoundException.class, () -> clientService.getClient(client.getId()));
    }
}
