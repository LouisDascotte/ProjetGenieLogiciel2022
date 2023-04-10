package com.pgl.energenius.service;

import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.repository.PortfolioRepository;
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
    private SecurityService securityService;

    @Autowired
    private ValidationService validationService;

    public Portfolio insertPortfolio(Portfolio portfolio) throws ObjectNotValidatedException {

        validationService.validate(portfolio);
        return portfolioRepository.insert(portfolio);
    }

    public void savePortfolio(Portfolio portfolio) throws ObjectNotValidatedException {

        validationService.validate(portfolio);
        portfolioRepository.save(portfolio);
    }

    public Portfolio getPortfolio(ObjectId portfolioId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException {

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ObjectNotFoundException("Portfolio not found with id: " + portfolioId));

        ObjectId clientId = securityService.getCurrentClientLogin().getClient().getId();

        // Permet de vérifier si le portfolio appartient bien à l'utilisateur connecté.
        if (!clientId.equals(portfolio.getClientId())) {
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

    public Portfolio createPortfolio(PortfolioDto portfolioDto) throws InvalidUserDetailsException, ObjectNotValidatedException {

        Client client = securityService.getCurrentClientLogin().getClient();
        return insertPortfolio(Portfolio.builder(portfolioDto).clientId(client.getId()).build());
    }

    public List<Portfolio> getAllPortfolios() throws InvalidUserDetailsException {

        Client client = securityService.getCurrentClientLogin().getClient();
        return portfolioRepository.findByClientId(client.getId());
    }

    public SupplyPoint createSupplyPoint(ObjectId portfolioId, SupplyPointDto supplyPointDto) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectAlreadyExitsException, ObjectNotValidatedException {

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

        savePortfolio(portfolio);
        return supplyPoint;
    }

    public void deleteSupplyPoint(ObjectId portfolioId, String EAN) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException {

        Portfolio portfolio = getPortfolio(portfolioId);

        SupplyPoint supplyPoint = portfolio.getSupplyPoints().stream().filter(sp -> EAN.equals(sp.getEAN())).findFirst()
                .orElseThrow(() -> new ObjectNotFoundException("SupplyPoint not found with EAN: " + EAN));

        portfolio.getSupplyPoints().remove(supplyPoint);

        savePortfolio(portfolio);
    }
}
