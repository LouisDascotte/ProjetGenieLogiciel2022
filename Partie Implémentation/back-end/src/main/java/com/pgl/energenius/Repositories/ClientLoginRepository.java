package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.ClientLogin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientLoginRepository extends MongoRepository<ClientLogin, String> {
    ClientLogin findByEmail(String email);
}
