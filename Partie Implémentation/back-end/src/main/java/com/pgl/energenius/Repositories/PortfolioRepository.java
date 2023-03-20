package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Portfolio;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends MongoRepository<Portfolio, ObjectId> {
    List<Portfolio> findByClient(Client client);
}
