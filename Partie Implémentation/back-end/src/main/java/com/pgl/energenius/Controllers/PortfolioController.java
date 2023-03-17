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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/all")
    public ResponseEntity<List<Portfolio>> getPortfolios() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Client client = ((ClientLogin) authentication.getPrincipal()).getClient();

        List<Portfolio> portfolios = portfolioService.clientPortfolios(client);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    @GetMapping("/consumption")
    public ResponseEntity<HashMap<EnergyType, List<Reading>>> getConsumption(@RequestBody ObjectId portfolioId) {

        Optional<Portfolio> portfolioOptional = portfolioService.getPortfolio(portfolioId);

        if (portfolioOptional.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Portfolio portfolio = portfolioOptional.get();
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
