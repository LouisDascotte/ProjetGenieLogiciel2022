package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Client;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends MongoRepository<Client, ObjectId> {
  Client findByEmail(String email);
}
