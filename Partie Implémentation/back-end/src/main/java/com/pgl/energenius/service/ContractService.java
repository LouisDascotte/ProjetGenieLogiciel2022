package com.pgl.energenius.service;


import com.google.maps.errors.ApiException;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.*;
import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.contract.GazElecContract;
import com.pgl.energenius.model.contract.SimpleContract;
import com.pgl.energenius.model.dto.GazElecContractRequestDto;
import com.pgl.energenius.model.dto.SimpleContractRequestDto;
import com.pgl.energenius.model.notification.ContractRequestNotification;
import com.pgl.energenius.model.notification.Notification;
import com.pgl.energenius.model.offer.GazElecOffer;
import com.pgl.energenius.model.offer.Offer;
import com.pgl.energenius.model.offer.SimpleOffer;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.OfferRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

        if (contractRepository.existsByEAN(contract.getEAN())) {
            throw new ObjectAlreadyExitsException("Contrat already exists with meter of EAN: " + contract.getEAN());
        }

        return contractRepository.insert(contract);
    }

    public Contract insertContract(GazElecContract contract) throws ObjectNotValidatedException, ObjectAlreadyExitsException {

        validationUtils.validate(contract);

        if (contractRepository.existsByEAN(contract.getEAN_ELEC())) {
            throw new ObjectAlreadyExitsException("Contrat already exists with meter of EAN: " + contract.getEAN_ELEC());

        } else if (contractRepository.existsByEAN(contract.getEAN_GAZ())) {
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

    public Offer getOffer(ObjectId offerId) throws ObjectNotFoundException {

        return offerRepository.findById(offerId)
                .orElseThrow(() -> new ObjectNotFoundException("No offer found with id: " + offerId));
    }

    public void createSimpleContractRequest(SimpleContractRequestDto contractRequest, ObjectId offerId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException, BadRequestException, IOException, InterruptedException, ApiException, ObjectAlreadyExitsException, ObjectNotValidatedException {

        Meter meter = meterService.getMeter(contractRequest.getEAN());
        String addressStr = addressService.getFormattedAddress(contractRequest.getAddress());

        if (meter.getStatus() == Meter.Status.AFFECTED) {
            throw new UnauthorizedAccessException("Cannot create the contract request with a meter that is already affected to another contract");

        } else if (!Objects.equals(meter.getAddress(), addressStr)) {
            throw new BadRequestException("Cannot create the contract request because the address of the request is not the same as the meter's address");
        }

        SimpleOffer offer;
        try {
            offer = (SimpleOffer) getOffer(offerId);

        } catch (ClassCastException e) {
            throw new BadRequestException("Cannot create the contract request with the offer of id: " + offerId);
        }

        if (meter.getEnergyType() != offer.getEnergyType()) {
            throw new BadRequestException("Cannot create the contract request because the energy of the meter and the offer are not the same");

        } else if (meter.getMeterType() != offer.getMeterType()) {
            throw new BadRequestException("Cannot create the contract request because the meter type of the meter and the offer are not the same");
        }

        Client client = securityUtils.getCurrentClientLogin().getClient();
        Supplier supplier = supplierService.getSupplierByName(offer.getSupplierName());

        if (!addressService.isAddressInArea(supplier.getAreaId(), addressService.getAddress(addressStr))) {
            throw new BadRequestException("Cannot create the contract request because the address is outside the operating region of the supplier");
        }

        SimpleContract contract = SimpleContract.builder()
                .clientId(client.getId())
                .supplierId(supplier.getId())
                .type(Contract.Type.SIMPLE_CONTRACT)
                .offerId(offerId)
                .EAN(meter.getEAN())
                .build();

        insertContract(contract);

        ContractRequestNotification notification = ContractRequestNotification.builder()
                .senderId(client.getId())
                .receiverId(supplier.getId())
                .type(Notification.Type.CONTRACT_REQUEST_NOTIFICATION)
                .contract(contract)
                .build();

        notificationService.insertNotification(notification);
    }

    public void createGazElecContractRequest(GazElecContractRequestDto contractRequest, ObjectId offerId) throws ObjectNotFoundException, InvalidUserDetailsException, UnauthorizedAccessException, BadRequestException, IOException, InterruptedException, ApiException, ObjectAlreadyExitsException, ObjectNotValidatedException {

        Meter meter_ELEC = meterService.getMeter(contractRequest.getEAN_ELEC());
        Meter meter_GAZ = meterService.getMeter(contractRequest.getEAN_GAZ());
        String addressStr = addressService.getFormattedAddress(contractRequest.getAddress());

        if (meter_ELEC.getStatus() == Meter.Status.AFFECTED || meter_GAZ.getStatus() == Meter.Status.AFFECTED) {
            throw new UnauthorizedAccessException("Cannot create the contract request with a meter that is already affected to another contract");

        } else if (!Objects.equals(meter_ELEC.getAddress(), addressStr) || !Objects.equals(meter_GAZ.getAddress(), addressStr)) {
            throw new BadRequestException("Cannot create the contract request because the address of the request is not the same as one of the meters address");
        }

        GazElecOffer offer;
        try {
            offer = (GazElecOffer) getOffer(offerId);

        } catch (ClassCastException e) {
            throw new BadRequestException("Cannot create the contract request with the offer of id: " + offerId);
        }

        if (meter_ELEC.getEnergyType() != EnergyType.ELEC || meter_GAZ.getEnergyType() != EnergyType.GAZ) {
            throw new BadRequestException("Cannot create the contract request because the energy type of one of the meters is not correct");

        } else if (meter_ELEC.getMeterType() != offer.getMeterType() || meter_GAZ.getMeterType() != offer.getMeterType()) {
            throw new BadRequestException("Cannot create the contract request because the meter type of one of the meters is not the same as the offer's meter type");
        }

        Client client = securityUtils.getCurrentClientLogin().getClient();
        Supplier supplier = supplierService.getSupplierByName(offer.getSupplierName());

        if (!addressService.isAddressInArea(supplier.getAreaId(), addressService.getAddress(addressStr))) {
            throw new BadRequestException("Cannot create the contract request because the address is outside the operating region of the supplier");
        }

        GazElecContract contract = GazElecContract.builder()
                .clientId(client.getId())
                .supplierId(supplier.getId())
                .type(Contract.Type.GAZ_ELEC_CONTRACT)
                .offerId(offerId)
                .EAN_ELEC(meter_ELEC.getEAN())
                .EAN_GAZ(meter_GAZ.getEAN())
                .build();

        insertContract(contract);

        ContractRequestNotification notification = ContractRequestNotification.builder()
                .senderId(client.getId())
                .receiverId(supplier.getId())
                .type(Notification.Type.CONTRACT_REQUEST_NOTIFICATION)
                .contract(contract)
                .build();

        notificationService.insertNotification(notification);
    }

    public List<Offer> getOffers(GazElecContractRequestDto contractRequest) throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        List<GazElecOffer> gazElecOffers = offerRepository.findByMeterType(contractRequest.getMeterType());
        List<Offer> offers = gazElecOffers.stream().map(o -> (Offer) o).collect(Collectors.toList());
        return getValidOffers(offers, contractRequest.getAddress());
    }

    public List<Offer> getOffers(SimpleContractRequestDto contractRequest) throws ObjectNotFoundException, IOException, InterruptedException, ApiException {

        List<SimpleOffer> simpleOffers = offerRepository.findByMeterTypeAndEnergyType(contractRequest.getMeterType(), contractRequest.getEnergy());
        List<Offer> offers = simpleOffers.stream().map(o -> (Offer) o).collect(Collectors.toList());
        return getValidOffers(offers, contractRequest.getAddress());
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

        Address address = addressService.getAddress(addressService.getFormattedAddress(addressStr));
        List<Offer> validOffers = new ArrayList<>();

        for (String name : supplierOffers.keySet()) {

            try {
                Supplier supplier = supplierService.getSupplierByName(name);

                if (addressService.isAddressInArea(supplier.getAreaId(), address)) {
                    validOffers.addAll(supplierOffers.get(name));
                }

            } catch (ObjectNotFoundException ignored) {}
        }

        return validOffers;
    }
}
