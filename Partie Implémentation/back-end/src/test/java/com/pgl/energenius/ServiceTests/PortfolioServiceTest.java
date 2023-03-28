package com.pgl.energenius.ServiceTests;

import com.pgl.energenius.Repositories.PortfolioRepository;
import com.pgl.energenius.Services.PortfolioService;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class PortfolioServiceTest {

    @Mock
    PortfolioRepository portfolioRepository;

    @InjectMocks
    PortfolioService portfolioService;
}
