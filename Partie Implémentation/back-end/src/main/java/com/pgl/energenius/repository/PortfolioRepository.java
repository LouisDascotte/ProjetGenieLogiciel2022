package com.pgl.energenius.repository;

import com.pgl.energenius.model.Portfolio;
import com.pgl.energenius.model.projection.PortfolioProjection;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * This interface defines the methods to interact with the "portfolios" collection in the database.
 */
@Repository
public interface PortfolioRepository extends MongoRepository<Portfolio, ObjectId> {

    /**
     * Returns a list of portfolios belonging to the specified client.
     *
     * @param clientId the id of the client for which to retrieve portfolios
     * @return a list of Portfolio instances belonging to the specified client
     */
    List<Portfolio> findByClientId(ObjectId clientId);

    boolean existsByIdAndClientId(ObjectId id, ObjectId clientId);

    List<PortfolioProjection> findByClientId(ObjectId clientId, Class<PortfolioProjection> projection);
}
