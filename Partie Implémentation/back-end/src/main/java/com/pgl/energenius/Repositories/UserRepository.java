package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.EmployeeLogin;
import com.pgl.energenius.Objects.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This interface defines the methods to interact with the "logins" collection in the database.
 */
@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    /**
     * Retrieves a {@link ClientLogin} object by its email.
     *
     * @param email the email to search for
     * @return an Optional containing the ClientLogin object, or empty if not found
     */
    Optional<ClientLogin> findByEmail(String email);

    /**
     * Retrieves a {@link EmployeeLogin} object by its id.
     *
     * @param loginId the if to search for
     * @return an Optional containing the ClientLogin object, or empty if not found
     */
    Optional<EmployeeLogin> findByLoginId(String loginId);
}
