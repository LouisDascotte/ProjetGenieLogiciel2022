package com.pgl.energenius.Controllers;

import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Objects.DTOs.PortfolioDto;
import com.pgl.energenius.Repositories.PortfolioRepository;
import com.pgl.energenius.Services.ClientService;
import com.pgl.energenius.Services.PortfolioService;
import com.pgl.energenius.enums.EnergyType;

import lombok.extern.slf4j.Slf4j;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * The PortfolioController class handles all HTTP requests related to Portfolios.
 */
@Slf4j
@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private PortfolioRepository portfolioRepository;

    /**
     * This method returns all portfolios of the connected client.
     *
     * @return A list of portfolios owned by the client
     */
    @GetMapping("/all")
    public ResponseEntity<List<Portfolio>> getPortfolios() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Pas besoin de vérifier, si authentication.getPrincipal() est un ClientLogin,
        // car on s'est que l'utilisateur doit être authentifié pour accéder à ce mapping
        Client client = ((ClientLogin) authentication.getPrincipal()).getClient();

        List<Portfolio> portfolios = portfolioService.clientPortfolios(client);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    /**
     * This method adds a portfolio to the database.
     *
     * @param portfolioDto The portfolio to add
     * @return A message confirming that the portfolio was added
     */
    @PostMapping("/create")
    @ResponseBody
    public String createPortfolio(@RequestBody PortfolioDto portfolioDto){
        Portfolio portfolio = new Portfolio();
//            portfolioDto.getClient(),
//            portfolioDto.getAddress(), TODO
//            portfolioDto.getName());
        log.info("Activated");
        portfolioRepository.save(portfolio);
        return "Portfolio Added";
    }

    /**
     * Retrieves the consumption readings for a portfolio.
     *
     * @param portfolioId the ID of the portfolio to retrieve the consumption readings for
     * @return the consumption readings for the portfolio
     */
    @GetMapping("/consumption")
    public ResponseEntity<HashMap<EnergyType, List<Reading>>> getConsumption(@RequestBody ObjectId portfolioId) {

        Optional<Portfolio> portfolioOptional = portfolioService.getPortfolio(portfolioId);

        if (portfolioOptional.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Portfolio portfolio = portfolioOptional.get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Pas besoin de vérifier, si authentication.getPrincipal() est un ClientLogin,
        // car on s'est que l'utilisateur doit être authentifié pour accéder à ce mapping
        Client client = ((ClientLogin) authentication.getPrincipal()).getClient();

        // Permet de vérifier si le portfolio appartient bien à l'utilisateur connecté.
        if (!client.equals(portfolio.getClient())) {
            new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }

        HashMap<EnergyType, List<Reading>> readings = new HashMap<>();

        readings.put(EnergyType.GAZ, new ArrayList<>());
        readings.put(EnergyType.ELEC, new ArrayList<>());
        readings.put(EnergyType.EAU, new ArrayList<>());

        for (SupplyPoint sp: portfolio.getSupplyPoints()) {

            Meter meter = sp.getMeter();
            List<Reading> readings_of_energy_type = readings.get(meter.getEnergyType());
            readings_of_energy_type.addAll(meter.getReadings());
        }

        return new ResponseEntity<>(readings, HttpStatus.OK);
    }
}
