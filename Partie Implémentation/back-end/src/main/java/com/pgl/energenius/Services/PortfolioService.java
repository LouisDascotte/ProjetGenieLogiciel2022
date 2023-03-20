package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Portfolio;
import com.pgl.energenius.Repositories.PortfolioRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This class provides services related to PortfolioRepository.
 */
@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    /**
     * Returns a list of portfolios belonging to the specified client.
     *
     * @param client the client for which to retrieve portfolios
     * @return a list of Portfolio instances belonging to the specified client
     */
    public List<Portfolio> clientPortfolios(Client client) {
        return portfolioRepository.findByClient(client);
    }

    /**
     * Returns the portfolio with the specified ID.
     *
     * @param id the ID of the portfolio to retrieve
     * @return an Optional containing the Portfolio instance of the specified ID, or an empty Optional if the portfolio doesn't exist
     */
    public Optional<Portfolio> getPortfolio(ObjectId id) {
        return portfolioRepository.findById(id);
    }
}
