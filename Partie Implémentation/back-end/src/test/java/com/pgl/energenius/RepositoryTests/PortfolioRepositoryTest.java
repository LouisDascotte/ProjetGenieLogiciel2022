package com.pgl.energenius.RepositoryTests;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Portfolio;
import com.pgl.energenius.Repositories.PortfolioRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataMongoTest
public class PortfolioRepositoryTest {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Test
    public void findByClient_should_return_list_of_client_portfolios() {

        Client client = new Client("test", "test", "1234", null, null);
        Client client2 = new Client("test2", "test2", "1234", null, null);

        Portfolio portfolio1 = new Portfolio(client, null, "portfolio1");
        Portfolio portfolio2 = new Portfolio(client, null, "portfolio2");

        portfolioRepository.save(portfolio1);
        portfolioRepository.save(portfolio2);

        List<Portfolio> portfolios = new ArrayList<>();
        portfolios.add(portfolio1);
        portfolios.add(portfolio2);
        assertEquals(portfolios, portfolioRepository.findByClient(client));

        assertTrue(portfolioRepository.findByClient(client2).isEmpty());
    }


}
