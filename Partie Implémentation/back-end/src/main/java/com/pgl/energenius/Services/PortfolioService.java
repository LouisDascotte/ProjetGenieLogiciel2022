package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Portfolio;
import com.pgl.energenius.Repositories.PortfolioRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    public List<Portfolio> clientPortfolios(Client client) {
        return portfolioRepository.findByClient(client);
    }

    public Optional<Portfolio> getPortfolio(ObjectId id) {
        return portfolioRepository.findById(id);
    }
}
