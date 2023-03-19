package com.pgl.energenius.Controllers;

import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Services.PortfolioService;
import com.pgl.energenius.enums.EnergyType;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/portfolios")
    public ResponseEntity<List<Portfolio>> getPortfolios() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Pas besoin de vérifier, si authentication.getPrincipal() est un ClientLogin,
        // car on s'est que l'utilisateur doit être authentifié pour accéder à ce mapping
        Client client = ((ClientLogin) authentication.getPrincipal()).getClient();

        List<Portfolio> portfolios = portfolioService.clientPortfolios(client);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    @GetMapping("/portfolio/{id}")
    public ResponseEntity<HashMap<EnergyType, List<Reading>>> getConsumption(@RequestBody ObjectId id) {

        Optional<Portfolio> portfolioOptional = portfolioService.getPortfolio(id);

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

    @PostMapping("/portfolio/create")
    public ResponseEntity<Portfolio> createPortfolio() {




        return new ResponseEntity<>(null, HttpStatus.CREATED); // TODO changer null
    }
}
