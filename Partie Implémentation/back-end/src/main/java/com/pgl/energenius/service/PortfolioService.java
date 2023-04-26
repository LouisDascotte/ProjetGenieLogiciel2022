package com.pgl.energenius.service;

import com.google.maps.errors.ApiException;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.ProductionPointDto;
import com.pgl.energenius.model.dto.StatsPortfolio;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.notification.ProductionPointNotification;
import com.pgl.energenius.model.projection.PortfolioProjection;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.ProductionReading;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.repository.GreenCertificateRepository;
import com.pgl.energenius.repository.MeterAllocationRepository;
import com.pgl.energenius.repository.PortfolioRepository;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.repository.ReadingRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.StartDocument;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private MeterAllocationRepository meterAllocationRepository;

    @Autowired
    private ReadingRepository readingRepository;

    @Autowired
    private GreenCertificateRepository greenCertificateRepository;

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
        return getPortfolioConsumption(portfolio);
    }

    private HashMap<EnergyType, List<Reading>> getPortfolioConsumption(Portfolio portfolio) throws ObjectNotFoundException {

        HashMap<EnergyType, List<Reading>> readings = new HashMap<>();

        for (SupplyPoint sp: portfolio.getSupplyPoints()) {

            Meter meter = meterService.getMeterWithoutCheck(sp.getEAN());

            if (!readings.containsKey(meter.getEnergyType())) {
                readings.put(meter.getEnergyType(), new ArrayList<>());
            }
            readings.get(meter.getEnergyType()).addAll(readingService.getReadingsClient(sp.getEAN(), portfolio.getClientId()));
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

    public SupplyPoint createSupplyPoint(ObjectId portfolioId, SupplyPointDto supplyPointDto) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectAlreadyExitsException, ObjectNotValidatedException, AddressesNotEqualsException, BadRequestException, IOException, InterruptedException, ApiException {

        Portfolio portfolio = getPortfolio(portfolioId);
        Meter meter;

        if (supplyPointDto.getType() != SupplyPoint.Type.PRODUCTION_POINT) {

            meter = meterService.getMeter(supplyPointDto.getEAN());

            if (!Objects.equals(meter.getAddress(), portfolio.getAddress())) {
                throw new AddressesNotEqualsException("The meter's address is not equal to the portfolio's address");
            }

        } else {
            if (!(supplyPointDto instanceof ProductionPointDto productionPointDto)) {
                throw new BadRequestException("Cannot create a production point without the supplier name");
            }

            meter = meterService.createMeterIfNotExistsAndCheck(productionPointDto.getEAN(),
                    portfolio.getAddress(),
                    MeterType.NUMERIC,
                    EnergyType.ELEC_PRODUCTION,
                    HourType.SIMPLE);
            meter.setStatus(Meter.Status.AWAITING_APPROVAL);
            meter.setClientId(securityUtils.getCurrentClientLogin().getClient().getId());
            meter.setSupplierId(supplierService.getSupplierByName(productionPointDto.getSupplierName()).getId());

            meterService.saveMeter(meter);

            ProductionPointNotification notification = ProductionPointNotification.builder()
                    .type(Notification.Type.PRODUCTION_POINT_REQUEST_NOTIFICATION)
                    .receiverId(meter.getSupplierId())
                    .senderId(meter.getClientId())
                    .EAN(meter.getEAN())
                    .build();
            notificationService.insertNotification(notification);
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

        if (supplyPoint.getType() == SupplyPoint.Type.PRODUCTION_POINT) {

            Meter meter = meterService.getMeter(EAN);

            meter.setSupplierId(null);
            meter.setClientId(null);
            meter.setStatus(Meter.Status.DISAFFECTED);

            meterService.saveMeter(meter);

            String dateNow = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

            MeterAllocation meterAllocation = meterAllocationRepository.findByDateAndEAN(dateNow, meter.getEAN());

            if (meterAllocation != null) {
                meterAllocation.setStatus(MeterAllocation.Status.ENDED);
                meterAllocation.setEndDate(dateNow);
                meterAllocationRepository.save(meterAllocation);
            }
        }

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

    public void acceptProductionPoint(String EAN) throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException, BadRequestException, ObjectNotValidatedException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        Meter meter = meterService.getMeter(EAN);

        if (meter.getEnergyType() != EnergyType.ELEC_PRODUCTION) {
            throw new UnauthorizedAccessException("This meter is not used for electricity production");

        } else if (meter.getStatus() != Meter.Status.AWAITING_APPROVAL) {
            throw new BadRequestException("This production point has already been accepted");
        }

        meter.setStatus(Meter.Status.AFFECTED);
        meterService.saveMeter(meter);

        MeterAllocation meterAllocation = new MeterAllocation(meter.getEAN(),
                LocalDate.now().format(DateTimeFormatter.ISO_DATE),
                "9999-99-99",
                meter.getClientId(),
                supplier.getName(),
                MeterAllocation.Status.ACTIVE);
        meterAllocationRepository.insert(meterAllocation);

        ProductionPointNotification notification = ProductionPointNotification.builder()
                .type(Notification.Type.PRODUCTION_POINT_ACCEPTED_NOTIFICATION)
                .senderId(meter.getSupplierId())
                .receiverId(meter.getClientId())
                .EAN(meter.getEAN())
                .build();
        notificationService.insertNotification(notification);
    }

    public void requestGreenCertificate(ObjectId portfolioId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException {

        Portfolio portfolio = getPortfolio(portfolioId);

        for (SupplyPoint sp : portfolio.getSupplyPoints()) {

            if (sp.getType() == SupplyPoint.Type.PRODUCTION_POINT) {

                String dateNow = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

                ProductionReading lastReading = (ProductionReading) (readingRepository.findByEANAndDate(sp.getEAN(), dateNow).get());

                if (lastReading.getThreshold() >= 1000) {

                    Meter meter = meterService.getMeter(sp.getEAN());

                    GreenCertificate greenCertificate = new GreenCertificate(portfolioId, dateNow, GreenCertificate.Status.PENDING);
                    greenCertificateRepository.insert(greenCertificate);

                    ProductionPointNotification notification = ProductionPointNotification.builder()
                            .type(Notification.Type.GREEN_CERTIFICATE_REQUEST_NOTIFICATION)
                            .receiverId(meter.getSupplierId())
                            .senderId(meter.getClientId())
                            .EAN(meter.getEAN())
                            .build();
                    notificationService.insertNotification(notification);
                }
                break;
            }
        }
    }

    public void acceptGreenCertificate(ObjectId portfolioId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, ObjectNotValidatedException {

        Portfolio portfolio = getPortfolio(portfolioId);

        for (SupplyPoint sp : portfolio.getSupplyPoints()) {

            if (sp.getType() == SupplyPoint.Type.PRODUCTION_POINT) {

                Meter meter = meterService.getMeter(sp.getEAN());
                ProductionReading lastReading = (ProductionReading) (readingService.findLastReading(sp.getEAN()));

                if (lastReading.getThreshold() >= 1000) {

                    GreenCertificate greenCertificate = greenCertificateRepository.findByPortfolioIdAndStatus(portfolioId, GreenCertificate.Status.PENDING)
                            .orElseThrow(() -> new ObjectNotFoundException("There is no green certificate request"));
                    greenCertificate.setStatus(GreenCertificate.Status.ACCEPTED);
                    greenCertificateRepository.save(greenCertificate);

                    lastReading.setThreshold(lastReading.getThreshold() - 1000);
                    readingRepository.save(lastReading);

                    ProductionPointNotification notification = ProductionPointNotification.builder()
                            .type(Notification.Type.GREEN_CERTIFICATE_ACCEPTED_NOTIFICATION)
                            .senderId(meter.getSupplierId())
                            .receiverId(meter.getClientId())
                            .EAN(meter.getEAN())
                            .build();
                    notificationService.insertNotification(notification);
                }
                break;
            }
        }
    }

    public List<GreenCertificate> getGreenCertificates(ObjectId portfolioId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        getPortfolio(portfolioId);
        return greenCertificateRepository.findByPortfolioId(portfolioId);
    }

    public HashMap<EnergyType, StatsPortfolio> getPortfolioStats(ObjectId portfolioId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {
        Portfolio portfolio = getPortfolio(portfolioId);
        return getPortfolioStats(portfolio);
    }

    public HashMap<EnergyType, StatsPortfolio> getPortfolioStats(Portfolio portfolio) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        HashMap<EnergyType, List<Reading>> consumptions = getPortfolioConsumption(portfolio);
        HashMap<EnergyType, StatsPortfolio> stats = new HashMap<>();

        for (EnergyType e : consumptions.keySet()) {

            if (e == EnergyType.ELEC_PRODUCTION)
                continue;

            List<Reading> readings = consumptions.get(e);

            int[] values = new int[readings.size()];

            if (readings.get(0) instanceof SimpleReading firstReading) {
                values[0] = firstReading.getValue();

            } else {
                DoubleReading firstReading = (DoubleReading) readings.get(0);
                values[0] = firstReading.getDayValue() + firstReading.getNightValue();
            }

            int max = 0;
            int min = Integer.MAX_VALUE;
            int sum = 0;
            int delta;

            for (int i = 1; i < readings.size(); i++) {

                if (readings.get(i) instanceof SimpleReading reading) {

                    delta = reading.getValue() - values[i - 1];
                    values[i] = reading.getValue();

                } else {
                    DoubleReading reading = (DoubleReading) readings.get(i);

                    delta = (reading.getDayValue() + reading.getNightValue()) - values[i - 1];
                    values[i] = reading.getDayValue() + reading.getNightValue();
                }

                min = Math.min(min, delta);
                max = Math.max(max, delta);
                sum += delta;
            }

            int average = sum / readings.size();

            int sumOfDeltaMinusAverage = 0;

            for (int value : values) {

                sumOfDeltaMinusAverage = (value - average)^2;
            }

            int standard_deviation = (int) Math.round(Math.sqrt((double) sumOfDeltaMinusAverage / readings.size()));

            stats.put(e, new StatsPortfolio(average, max, min, standard_deviation));
        }
        return stats;
    }

    public HashMap<EnergyType, Integer> getAverageOfAllPortfolios() throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        List<Portfolio> portfolios = portfolioRepository.findAll();

        HashMap<EnergyType, Integer> averageStatOfAllPortfolios = new HashMap<>();
        HashMap<EnergyType, Integer> nbrOfStatsByEnergyType = new HashMap<>();

        for (Portfolio p : portfolios) {

            HashMap<EnergyType, StatsPortfolio> statsP = getPortfolioStats(p);

             for (EnergyType e : statsP.keySet()) {
                 averageStatOfAllPortfolios.put(e, averageStatOfAllPortfolios.get(e) + statsP.get(e).getAverage());
                 nbrOfStatsByEnergyType.put(e, nbrOfStatsByEnergyType.get(e) + 1);
             }
        }

        averageStatOfAllPortfolios.replaceAll((e, v) -> v / nbrOfStatsByEnergyType.get(e));
        return averageStatOfAllPortfolios;
    }
}
