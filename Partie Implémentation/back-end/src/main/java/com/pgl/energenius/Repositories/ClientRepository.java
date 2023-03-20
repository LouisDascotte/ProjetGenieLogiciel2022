package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Client;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface defines the methods to interact with the "clients" collection in the database.
 */
@Repository
public interface ClientRepository extends MongoRepository<Client, ObjectId> {
}
