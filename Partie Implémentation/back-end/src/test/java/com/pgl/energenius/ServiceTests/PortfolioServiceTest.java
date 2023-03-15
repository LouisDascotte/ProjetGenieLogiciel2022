package com.pgl.energenius.ServiceTests;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Portfolio;
import com.pgl.energenius.Repositories.PortfolioRepository;
import com.pgl.energenius.Services.PortfolioService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PortfolioServiceTest {

    @Mock
    PortfolioRepository portfolioRepository;

    @InjectMocks
    PortfolioService portfolioService;

    @Test
    public void clientPortfolios_should_return_all_portfolios_of_client() {

        Client client = new Client("test", "test", "1234", null, null);

        Portfolio portfolio1 = new Portfolio(client, null, "portfolio1");
        Portfolio portfolio2 = new Portfolio(client, null, "portfolio2");

        ArrayList<Portfolio> portfolios = new ArrayList<>();
        portfolios.add(portfolio1);
        portfolios.add(portfolio2);

        when(portfolioRepository.findByClient(client)).thenReturn(portfolios);

        assertEquals(portfolios, portfolioService.clientPortfolios(client));
    }



}
