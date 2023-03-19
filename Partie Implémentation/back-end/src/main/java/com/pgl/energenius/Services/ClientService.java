package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> allClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClient(ObjectId id){
        return clientRepository.findById(id);
    }

    public Client getClient2(String email){
        return clientRepository.findByEmail(email);
    }
}
