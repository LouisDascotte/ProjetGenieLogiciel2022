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
     * Returns a list of portfolios owned by the specified client.
     *
     * @param client The client whose portfolios are being retrieved.
     * @return A list of portfolios owned by the client.
     */
    List<Portfolio> findByClient(Client client);
}
