package com.pgl.energenius.service;

import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.Exception.ObjectAlreadyExitsException;
import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.repository.ClientRepository;
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
    private ValidationService validationService;

    @InjectMocks
    private ClientService clientService;

    @Test
    public void test_createClient() throws ObjectAlreadyExitsException, ObjectNotValidatedException {

        ClientDto clientDto = ClientDto.builder()
                .firstName("test")
                .password("test")
                .build();

        when(clientRepository.insert(any(Client.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Client client = Client.builder(clientDto).build();
        Client result = clientService.createClient(clientDto);
        result.setId(client.getId());

        assertEquals(client, result);
        verify(userService, times(1)).insertUser(any(ClientLogin.class));
    }

    @Test
    public void test_createClient_ObjectAlreadyExits() throws ObjectNotValidatedException {

        ClientDto clientDto = ClientDto.builder()
                .password("test")
                .build();

        when(userService.insertUser(any(ClientLogin.class))).thenThrow(DuplicateKeyException.class);
        assertThrows(ObjectAlreadyExitsException.class, () -> clientService.createClient(clientDto));
    }
}
