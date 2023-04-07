package com.pgl.energenius.RepositoryTests;

import com.pgl.energenius.Repositories.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;

@DataMongoTest
public class PortfolioRepositoryTest {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

//    @Test
//    public void test_findByClient() {
//
//        // Create a test client and portfolio
//        Client client = new Client("test@test.com", "Test Client");
//        Portfolio portfolio = new Portfolio(client, "Test Portfolio");
//
//        // Save the portfolio to the embedded MongoDB
//        portfolioRepository.save(portfolio);
//
//        // Query for the portfolio by the client
//        List<Portfolio> portfolios = portfolioRepository.findByClient(client);
//
//        // Assert that the portfolio was found
//        assertTrue(portfolios.contains(portfolio));
//    }

}