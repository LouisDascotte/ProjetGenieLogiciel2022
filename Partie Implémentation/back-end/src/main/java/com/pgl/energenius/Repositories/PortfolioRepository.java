package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Portfolio;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This interface defines the methods to interact with the "portfolios" collection in the database.
 */
@Repository
public interface PortfolioRepository extends MongoRepository<Portfolio, ObjectId> {

    /**
     * Returns a list of portfolios belonging to the specified client.
     *
     * @param client the client for which to retrieve portfolios
     * @return a list of Portfolio instances belonging to the specified client
     */
    List<Portfolio> findByClient(Client client);
}
