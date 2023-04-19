package com.pgl.energenius.repository;

import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.projection.ClientProjection;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This interface defines the methods to interact with the "clients" collection in the database.
 */
@Repository
public interface ClientRepository extends MongoRepository<Client, ObjectId> {

    List<ClientProjection> findAllByIdIn(List<ObjectId> ids, Class<ClientProjection> projection);
}
