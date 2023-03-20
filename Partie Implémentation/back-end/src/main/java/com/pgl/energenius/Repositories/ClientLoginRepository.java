package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.ClientLogin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This interface defines the methods to interact with the "client_logins" collection in the database.
 */
@Repository
public interface ClientLoginRepository extends MongoRepository<ClientLogin, String> {

    /**
     * Retrieves a {@link ClientLogin} object by its email.
     *
     * @param email the email to search for
     * @return an Optional containing the ClientLogin object, or empty if not found
     */
    Optional<ClientLogin> findByEmail(String email);
}
