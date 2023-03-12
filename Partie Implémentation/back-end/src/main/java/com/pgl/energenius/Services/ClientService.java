package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> allClients() {
        return clientRepository.findAll();
    }
}
