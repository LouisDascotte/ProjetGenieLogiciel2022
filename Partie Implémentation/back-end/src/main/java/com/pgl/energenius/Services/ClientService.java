package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;
import java.util.Optional;

/**
 * This class provides services related to ClientRepository.
 */
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    /**
     * Returns an Optional containing the Client object corresponding to the given ObjectId if it exists in the database,
     * otherwise returns an empty Optional.
     *
     * @param id The ObjectId of the client to retrieve from the database.
     * @return An Optional containing the Client object corresponding to the given ObjectId if it exists in the database,
     *         otherwise an empty Optional.
     */
    public Optional<Client> getClient(ObjectId id){
        return clientRepository.findById(id);
    }
}
