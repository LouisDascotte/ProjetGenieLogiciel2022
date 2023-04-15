package com.pgl.energenius.service;

import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.exception.ObjectAlreadyExitsException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.Address;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.repository.ClientRepository;
import com.pgl.energenius.utils.ValidationUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
}
