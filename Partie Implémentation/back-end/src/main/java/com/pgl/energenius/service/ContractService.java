package com.pgl.energenius.service;


import com.google.maps.errors.ApiException;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.contract.GazElecContract;
import com.pgl.energenius.model.contract.SimpleContract;
import com.pgl.energenius.model.dto.*;
import com.pgl.energenius.model.notification.ContractNotification;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.offer.GazElecOffer;
import com.pgl.energenius.model.offer.Offer;
import com.pgl.energenius.model.offer.SimpleOffer;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.MeterRepository;
import com.pgl.energenius.repository.OfferRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ValidationUtils validationUtils;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private MeterService meterService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private NotificationService notificationService;

    public Contract insertContract(SimpleContract contract) throws ObjectNotValidatedException, ObjectAlreadyExitsException {

        validationUtils.validate(contract);

        if (existsByEAN(contract.getEAN())) {
            throw new ObjectAlreadyExitsException("Contrat already exists with meter of EAN: " + contract.getEAN());
        }

        return contractRepository.insert(contract);
    }

    public Contract insertContract(GazElecContract contract) throws ObjectNotValidatedException, ObjectAlreadyExitsException {

        validationUtils.validate(contract);

        if (existsByEAN(contract.getEAN_ELEC())) {
            throw new ObjectAlreadyExitsException("Contrat already exists with meter of EAN: " + contract.getEAN_ELEC());

        } else if (existsByEAN(contract.getEAN_GAZ())) {
            throw new ObjectAlreadyExitsException("Contrat already exists with meter of EAN: " + contract.getEAN_GAZ());
        }

        return contractRepository.insert(contract);
    }

    public void saveContract(Contract contract) throws ObjectNotValidatedException {

        validationUtils.validate(contract);
        contractRepository.save(contract);
    }

    public List<Contract> getContracts() throws InvalidUserDetailsException {

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();
            return contractRepository.findByClientId(client.getId());

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        return contractRepository.findBySupplierId(supplier.getId());
    }

    public Contract getContract(ObjectId contractId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ObjectNotFoundException("No contract found with id: " + contractId));

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();

            if (Objects.equals(client.getId(), contract.getClientId()))
                return contract;

            throw new UnauthorizedAccessException("Authenticated client does not own the requested contract");

        } catch (InvalidUserDetailsException ignored) {}

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

        if (Objects.equals(supplier.getId(), contract.getSupplierId()))
            return contract;

        throw new UnauthorizedAccessException("Authenticated employee does not own the requested contract");
    }

    public Offer getOffer(ObjectId offerId) throws ObjectNotFoundException {

        return offerRepository.findById(offerId)
                .orElseThrow(() -> new ObjectNotFoundException("No offer found with id: " + offerId));
    }

    public void createSimpleContractRequest(SimpleContractRequestDto contractRequest, ObjectId offerId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException, BadRequestException, IOException, InterruptedException, ApiException, ObjectAlreadyExitsException, ObjectNotValidatedException {

        if (!(getOffer(offerId) instanceof SimpleOffer offer)) {
            throw new BadRequestException("Cannot create the contract request with the offer of id: " + offerId);

        } else if (offer.getHourType() != contractRequest.getHourType()
                || offer.getEnergyType() != contractRequest.getEnergyType()) {

            throw new BadRequestException("Cannot create the contract request because the offer is not compatible with the contract request");
        }

        Meter meter = meterService.createMeterIfNotExistsAndCheck(contractRequest.getEAN(),
                contractRequest.getAddress(),
                contractRequest.getMeterType(),
                contractRequest.getEnergyType(),
                contractRequest.getHourType());

        Supplier supplier = supplierService.getSupplierByName(offer.getSupplierName());
        Address address = addressService.getAddress(meter.getAddress());

        if (!addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)) {
            throw new BadRequestException("Cannot create the contract request because the address is outside the operating region of the supplier");
        }
        Client client = securityUtils.getCurrentClientLogin().getClient();

        SimpleContract contract = SimpleContract.builder()
                .clientId(client.getId())
                .supplierId(supplier.getId())
                .type(Contract.Type.SIMPLE_CONTRACT)
                .offerId(offerId)
                .EAN(meter.getEAN())
                .build();

        insertContract(contract);

        ContractNotification notification = ContractNotification.builder()
                .senderId(client.getId())
                .receiverId(supplier.getId())
                .type(Notification.Type.CONTRACT_REQUEST_NOTIFICATION)
                .contract(contract)
                .build();

        notificationService.insertNotification(notification);
    }

    public void createGazElecContractRequest(GazElecContractRequestDto contractRequest, ObjectId offerId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException, BadRequestException, IOException, InterruptedException, ApiException, ObjectAlreadyExitsException, ObjectNotValidatedException {

        if (!(getOffer(offerId) instanceof GazElecOffer offer)) {
            throw new BadRequestException("Cannot create the contract request with the offer of id: " + offerId);

        } else if (offer.getHourType() != contractRequest.getHourType()) {
            throw new BadRequestException("Cannot create the contract request because the offer is not compatible with the contract request");
        }

        Meter meter_ELEC = meterService.createMeterIfNotExistsAndCheck(contractRequest.getEAN_ELEC(),
                contractRequest.getAddress(),
                contractRequest.getMeterType(),
                EnergyType.ELEC,
                contractRequest.getHourType());

        Meter meter_GAZ = meterService.createMeterIfNotExistsAndCheck(contractRequest.getEAN_GAZ(),
                contractRequest.getAddress(),
                contractRequest.getMeterType(),
                EnergyType.GAZ,
                contractRequest.getHourType());

        Supplier supplier = supplierService.getSupplierByName(offer.getSupplierName());
        Address address = addressService.getAddress(meter_ELEC.getAddress());

        if (!addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)) {
            throw new BadRequestException("Cannot create the contract request because the address is outside the operating region of the supplier");
        }
        Client client = securityUtils.getCurrentClientLogin().getClient();

        GazElecContract contract = GazElecContract.builder()
                .clientId(client.getId())
                .supplierId(supplier.getId())
                .type(Contract.Type.GAZ_ELEC_CONTRACT)
                .offerId(offerId)
                .EAN_ELEC(meter_ELEC.getEAN())
                .EAN_GAZ(meter_GAZ.getEAN())
                .build();

        insertContract(contract);

        ContractNotification notification = ContractNotification.builder()
                .senderId(client.getId())
                .receiverId(supplier.getId())
                .type(Notification.Type.CONTRACT_REQUEST_NOTIFICATION)
                .contract(contract)
                .build();

        notificationService.insertNotification(notification);
    }

    public List<Offer> getGazElecOffers(HourType hourType, String addressStr) throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        List<GazElecOffer> gazElecOffers = offerRepository.findByHourType(hourType);
        List<Offer> offers = gazElecOffers.stream().map(o -> (Offer) o).collect(Collectors.toList());
        return getValidOffers(offers, addressStr);
    }

    public List<Offer> getSimpleOffers(HourType hourType, EnergyType energyType, String addressStr) throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        List<SimpleOffer> simpleOffers = offerRepository.findByHourTypeAndEnergyType(hourType, energyType);
        List<Offer> offers = simpleOffers.stream().map(o -> (Offer) o).collect(Collectors.toList());
        return getValidOffers(offers, addressStr);
    }

    public List<Offer> getValidOffers(List<Offer> offers, String addressStr) throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        Map<String, List<Offer>> supplierOffers = new HashMap<>();

        for (Offer offer : offers) {

            if (supplierOffers.containsKey(offer.getSupplierName())) {
                supplierOffers.get(offer.getSupplierName()).add(offer);

            } else {
                List<Offer> list = new ArrayList<>();
                list.add(offer);
                supplierOffers.put(offer.getSupplierName(), list);
            }
        }

        Address address = addressService.createAddress(addressStr);
        List<Offer> validOffers = new ArrayList<>();

        for (String name : supplierOffers.keySet()) {

            try {
                Supplier supplier = supplierService.getSupplierByName(name);

                if (addressService.isAddressInOneOfAreas(supplier.getOperatingAreas(), address)) {
                    validOffers.addAll(supplierOffers.get(name));
                }

            } catch (ObjectNotFoundException ignored) {}
        }

        return validOffers;
    }

    public void cancelContract(ObjectId contractId) throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException, ObjectNotValidatedException {

        Contract contract = getContract(contractId);

        try {
            Client client = securityUtils.getCurrentClientLogin().getClient();

            if (contract.getStatus() == Contract.Status.PENDING) {

                try {
                    notificationService.deleteByContract(contract);

                } catch (ObjectNotFoundException ignored) {}

            } else {

                ContractNotification notification = ContractNotification.builder()
                        .senderId(client.getId())
                        .receiverId(contract.getSupplierId())
                        .type(Notification.Type.CANCEL_CONTRACT_REQUEST_NOTIFICATION)
                        .contract(contract)
                        .build();
                notificationService.insertNotification(notification);
                return;
            }

        } catch (InvalidUserDetailsException e) {

            Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

            checkMeterNotAffected(contract);

            Notification notification = Notification.builder()
                    .senderId(supplier.getId())
                    .receiverId(contract.getClientId())
                    .type(Notification.Type.CANCEL_CONTRACT_NOTIFICATION)
                    .build();
            notificationService.insertNotification(notification);
        }
        contractRepository.delete(contract);

        if (contract instanceof SimpleContract simpleContract) {

            meterService.deleteMeterIf_AWAITING_APPROVAL(simpleContract.getEAN());

        } else if (contract instanceof GazElecContract gazElecContract) {

            meterService.deleteMeterIf_AWAITING_APPROVAL(gazElecContract.getEAN_ELEC());
            meterService.deleteMeterIf_AWAITING_APPROVAL(gazElecContract.getEAN_GAZ());
        }
    }

    private void checkMeterNotAffected(Contract contract) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        if (contract instanceof SimpleContract simpleContract) {

            Meter meter = meterService.getMeter(simpleContract.getEAN());

            if (meter.getStatus() == Meter.Status.AFFECTED)
                throw new UnauthorizedAccessException("Cannot cancel this contract because the meter is still affected");

        } else {
            GazElecContract gazElecContract = (GazElecContract) contract;

            Meter meter_ELEC = meterService.getMeter(gazElecContract.getEAN_ELEC());
            Meter meter_GAZ = meterService.getMeter(gazElecContract.getEAN_GAZ());

            if (meter_GAZ.getStatus() == Meter.Status.AFFECTED || meter_ELEC.getStatus() == Meter.Status.AFFECTED)
                throw new UnauthorizedAccessException("Cannot cancel this contract because one of the meter is still affected");
        }
    }

    public List<Offer> getSupplierOffers() throws InvalidUserDetailsException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        return offerRepository.findBySupplierName(supplier.getName());
    }

    public Offer createOffer(OfferDto offerDto) throws InvalidUserDetailsException, ObjectNotValidatedException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();
        Offer offer;

        if (offerDto instanceof SimpleOfferDto simpleOfferDto) {

            offer = SimpleOffer.builder()
                    .hourType(simpleOfferDto.getHourType())
                    .contractLength(simpleOfferDto.getContractLength())
                    .cost(simpleOfferDto.getCost())
                    .nightCost(simpleOfferDto.getHourType() == HourType.SIMPLE ? 0 : simpleOfferDto.getNightCost())
                    .priceType(simpleOfferDto.getPriceType())
                    .supplierName(supplier.getName())
                    .type(Offer.Type.SIMPLE_OFFER)
                    .energyType(simpleOfferDto.getEnergyType())
                    .build();


        } else {
            GazElecOfferDto gazElecOfferDto = (GazElecOfferDto) offerDto;

            offer = GazElecOffer.builder()
                    .hourType(offerDto.getHourType())
                    .contractLength(offerDto.getContractLength())
                    .cost_ELEC(gazElecOfferDto.getCost_ELEC())
                    .nightCost_ELEC(offerDto.getHourType() == HourType.SIMPLE ? 0 : gazElecOfferDto.getNightCost_ELEC())
                    .cost_GAZ(gazElecOfferDto.getCost_GAZ())
                    .nightCost_GAZ(offerDto.getHourType() == HourType.SIMPLE ? 0 : gazElecOfferDto.getNightCost_GAZ())
                    .priceType(offerDto.getPriceType())
                    .supplierName(supplier.getName())
                    .type(Offer.Type.GAZ_ELEC_OFFER)
                    .build();
        }
        validationUtils.validate(offer);
        return offerRepository.insert(offer);
    }

    public void deleteOffer(ObjectId offerId) throws InvalidUserDetailsException, ObjectNotFoundException, UnauthorizedAccessException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

        Offer offer = getOffer(offerId);

        if (!Objects.equals(offer.getSupplierName(), supplier.getName())) {
            throw new UnauthorizedAccessException("Authenticated supplier cannot delete the offer of id:" + offerId);

        } else if (contractRepository.existsByOfferId(offerId)) {
            throw new UnauthorizedAccessException("Cannot delete this offer because there is one or more contracts using it");
        }
        offerRepository.delete(offer);
    }

    public boolean existsByEAN(String EAN) {
        return contractRepository.findByEAN(EAN).isPresent();
    }

    public void acceptContract(ObjectId contractId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException, BadRequestException, ObjectNotValidatedException {

        Contract contract = getContract(contractId);

        if (contract.getStatus() != Contract.Status.PENDING)
            throw new BadRequestException("This contract is already accepted");

        Offer offer = offerRepository.findById(contract.getOfferId())
                .orElseThrow(() -> new ObjectNotFoundException("No offer found with id: " + contract.getOfferId()));

        contract.setStatus(Contract.Status.ACCEPTED);

        LocalDate now = LocalDate.now();
        LocalDate nowPlusLength = now.plusMonths(offer.getContractLength());
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;
        contract.setBeginDate(now.format(formatter));
        contract.setEndDate(nowPlusLength.format(formatter));

        saveContract(contract);

        notificationService.insertNotification(ContractNotification.builder()
                        .contract(contract)
                        .receiverId(contract.getClientId())
                        .senderId(contract.getSupplierId())
                        .type(Notification.Type.ACCEPT_CONTRACT_NOTIFICATION)
                        .build());
    }

    @Scheduled(cron = "55 23 * * ?")
    public void checkContract() {

        String dateNow = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

        List<Contract> contracts = contractRepository.findByEndDate(dateNow);

        for (Contract c : contracts) {

            Notification notification = Notification.builder()
                    .senderId(c.getSupplierId())
                    .receiverId(c.getClientId())
                    .type(Notification.Type.END_CONTRACT_NOTIFICATION)
                    .build();

            try {
                notificationService.insertNotification(notification);

            } catch (ObjectNotValidatedException ignored) {}

            contractRepository.delete(c);
        }
    }
}
