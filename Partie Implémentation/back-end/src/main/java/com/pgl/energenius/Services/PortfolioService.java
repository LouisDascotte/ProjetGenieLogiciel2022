package com.pgl.energenius.Services;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Exception.ObjectAlreadyExitsException;
import com.pgl.energenius.Exception.ObjectNotFoundException;
import com.pgl.energenius.Exception.UnauthorizedAccessException;
import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Objects.DTOs.PortfolioDto;
import com.pgl.energenius.Objects.DTOs.SupplyPointDto;
import com.pgl.energenius.Repositories.PortfolioRepository;
import com.pgl.energenius.Utils.SecurityUtils;
import com.pgl.energenius.enums.EnergyType;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * This class provides services related to PortfolioRepository.
 */
@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private MeterService meterService;

    @Autowired
    private SecurityUtils securityUtils;

    public Portfolio getPortfolio(ObjectId portfolioId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException {

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ObjectNotFoundException("Portfolio not found with id: " + portfolioId));

        Client client = securityUtils.getCurrentClientLogin().getClient();

        // Permet de vérifier si le portfolio appartient bien à l'utilisateur connecté.
        if (!client.equals(portfolio.getClient())) {
            throw new UnauthorizedAccessException("Authenticated client does not own the requested portfolio.");
        }

        return portfolio;
    }

    public void deletePortfolio(ObjectId portfolioId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException {
        portfolioRepository.delete(getPortfolio(portfolioId));
    }

    public HashMap<EnergyType, List<Reading>> getPortfolioConsumption(ObjectId portfolioId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException{

        Portfolio portfolio = getPortfolio(portfolioId);

        HashMap<EnergyType, List<Reading>> readings = new HashMap<>();

        readings.put(EnergyType.GAZ, new ArrayList<>());
        readings.put(EnergyType.ELEC, new ArrayList<>());
        readings.put(EnergyType.EAU, new ArrayList<>());

        for (SupplyPoint sp: portfolio.getSupplyPoints()) {

            Meter meter = meterService.getMeter(sp.getEAN());
            List<Reading> readings_of_energy_type = readings.get(meter.getEnergyType());
            readings_of_energy_type.addAll(meter.getReadings());
        }

        return readings;
    }

    public Portfolio createPortfolio(PortfolioDto portfolioDto) throws InvalidUserDetailsException {

        Client client = securityUtils.getCurrentClientLogin().getClient();
        return portfolioRepository.insert(new Portfolio(client, portfolioDto));
    }

    public List<Portfolio> getAllPortfolios() throws InvalidUserDetailsException {

        Client client = securityUtils.getCurrentClientLogin().getClient();
        return portfolioRepository.findByClient(client);
    }

    public SupplyPoint createSupplyPoint(ObjectId portfolioId, SupplyPointDto supplyPointDto) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectAlreadyExitsException {

        Portfolio portfolio = getPortfolio(portfolioId);
        Meter meter = meterService.getMeter(supplyPointDto.getEAN());
        String EAN = meter.getEAN();

        for (SupplyPoint sp : portfolio.getSupplyPoints()) {

            if (EAN.equals(sp.getEAN())){
                throw new ObjectAlreadyExitsException("A supply point already exists (in the portfolio) with EAN: " + EAN);
            }
        }

        SupplyPoint supplyPoint = new SupplyPoint(EAN, supplyPointDto.getSupplyPointType());
        portfolio.getSupplyPoints().add(supplyPoint);

        portfolioRepository.save(portfolio);
        return supplyPoint;
    }

    public void deleteSupplyPoint(ObjectId portfolioId, String EAN) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Portfolio portfolio = getPortfolio(portfolioId);

        SupplyPoint supplyPoint = portfolio.getSupplyPoints().stream().filter(sp -> EAN.equals(sp.getEAN())).findFirst()
                .orElseThrow(() -> new ObjectNotFoundException("SupplyPoint not found with EAN: " + EAN));

        portfolio.getSupplyPoints().remove(supplyPoint);

        portfolioRepository.save(portfolio);
    }
}
