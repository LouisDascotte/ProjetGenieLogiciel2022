package com.pgl.energenius.service;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.model.projection.PortfolioProjection;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.repository.PortfolioRepository;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

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

    @Autowired
    private ValidationUtils validationUtils;

    @Autowired
    private AddressService addressService;

    @Autowired
    private ReadingService readingService;

    @Autowired
    private ClientService clientService;

    public Portfolio insertPortfolio(Portfolio portfolio) throws ObjectNotValidatedException {

        validationUtils.validate(portfolio);
        return portfolioRepository.insert(portfolio);
    }

    public void savePortfolio(Portfolio portfolio) throws ObjectNotValidatedException {

        validationUtils.validate(portfolio);
        portfolioRepository.save(portfolio);
    }

    public Portfolio getPortfolio(ObjectId portfolioId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException {

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ObjectNotFoundException("Portfolio not found with id: " + portfolioId));

        ObjectId clientId = securityUtils.getCurrentClientLogin().getClient().getId();

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

        for (SupplyPoint sp: portfolio.getSupplyPoints()) {

            Meter meter = meterService.getMeter(sp.getEAN());

            if (!readings.containsKey(meter.getEnergyType())) {
                readings.put(meter.getEnergyType(), new ArrayList<>());
            }
            readings.get(meter.getEnergyType()).addAll(readingService.getReadings(sp.getEAN()));
        }

        return readings;
    }

    public Portfolio createPortfolio(PortfolioDto portfolioDto) throws Exception {

        Client client = securityUtils.getCurrentClientLogin().getClient();

        Portfolio portfolio = Portfolio.builder()
                .address(addressService.createAddress(portfolioDto.getAddress()).getAddress())
                .name(portfolioDto.getName())
                .clientId(client.getId())
                .build();
        insertPortfolio(portfolio);

        if (client.getFavoritePortfolioId() == null) {
            client.setFavoritePortfolioId(portfolio.getId());
            clientService.saveClient(client);
        }

        return portfolio;
    }

    public List<Portfolio> getPortfolios() throws InvalidUserDetailsException {

        Client client = securityUtils.getCurrentClientLogin().getClient();
        return portfolioRepository.findByClientId(client.getId());
    }

    public List<PortfolioProjection> getPortfolioIdsAndNames() throws InvalidUserDetailsException {

        Client client = securityUtils.getCurrentClientLogin().getClient();
        return portfolioRepository.findByClientId(client.getId(), PortfolioProjection.class);
    }

    public SupplyPoint createSupplyPoint(ObjectId portfolioId, SupplyPointDto supplyPointDto) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectAlreadyExitsException, ObjectNotValidatedException, AddressesNotEqualsException {

        Portfolio portfolio = getPortfolio(portfolioId);
        Meter meter = meterService.getMeter(supplyPointDto.getEAN());

        if (!Objects.equals(meter.getAddress(), portfolio.getAddress())) {
            throw new AddressesNotEqualsException("The meter's address is not equal to the portfolio's address");
        }

        String EAN = meter.getEAN();

        for (SupplyPoint sp : portfolio.getSupplyPoints()) {

            if (EAN.equals(sp.getEAN())){
                throw new ObjectAlreadyExitsException("A supply point already exists (in the portfolio) with EAN: " + EAN);
            }
        }

        SupplyPoint supplyPoint = new SupplyPoint(EAN, supplyPointDto.getType());
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

    public List<Reading> getSupplyPointConsumption(ObjectId portfolioId, String EAN) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Portfolio portfolio = getPortfolio(portfolioId);
        boolean isSupplyPointInPortfolio = portfolio.getSupplyPoints().stream().anyMatch(sp -> Objects.equals(EAN, sp.getEAN()));

        if (!isSupplyPointInPortfolio) {
            throw new ObjectNotFoundException("No supply point found in portfolio of Id: " + portfolioId);
        }

        return readingService.getReadings(EAN);
    }
}
