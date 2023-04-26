package com.pgl.energenius.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.dto.*;
import com.pgl.energenius.service.ContractService;

/**
 * The ContractController class handles all HTTP requests related to Contracts
 */
@RestController
@RequestMapping("/api/contract")
@CrossOrigin(origins = "*")
public class ContractController {

    @Autowired
    private ContractService contractService;

    /**
     * GET method to get the contracts of the current authenticated user.
     *
     * @return OK and Authenticated user's contracts if successful. Otherwise, an appropriate HTTP status code.
     */
    @GetMapping("/all")
    public ResponseEntity<?> getContracts() {

        try {
            return new ResponseEntity<>(contractService.getContracts(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET method to get simple offers with the specified parameters
     *
     * @param hourType the hour type of the offers
     * @param energyType the energy type of the offers
     * @param address the address where the offers should be operating
     * @return OK and the offers with the specified parameters. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/offers")
    public ResponseEntity<?> getSimpleOffers(@RequestParam HourType hourType, @RequestParam EnergyType energyType, @RequestParam String address) {

        try {
            return new ResponseEntity<>(contractService.getSimpleOffers(hourType, energyType, address), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * GET method to get gaz elec offers with the specified parameters
     *
     * @param hourType the hour type of the offers
     * @param address the address where the offers should be operating
     * @return OK and the offers with the specified parameters. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/offers/gaz_elec")
    public ResponseEntity<?> getGazElecOffers(@RequestParam HourType hourType, @RequestParam String address) {

        try {
            return new ResponseEntity<>(contractService.getGazElecOffers(hourType, address), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * POST method to create a simple contract request.
     *
     * @param contractRequest DTO that contains the infos for the request
     * @param offerId The id of the chosen offer
     * @return CREATED if the request was created. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping
    public ResponseEntity<?> createSimpleContractRequest(@RequestBody SimpleContractRequestDto contractRequest, @RequestParam ObjectId offerId) {

        try {
            contractService.createSimpleContractRequest(contractRequest, offerId);
            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * POST method to create a gaz elec contract request.
     *
     * @param contractRequest DTO that contains the infos for the request
     * @param offerId The id of the chosen offer
     * @return CREATED if the request was created. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/gaz_elec")
    public ResponseEntity<?> createGazElecContractRequest(@RequestBody GazElecContractRequestDto contractRequest, @RequestParam ObjectId offerId) {

        try {
            contractService.createGazElecContractRequest(contractRequest, offerId);
            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * DELETE method to create a request to the supplier if the authenticated user is a client,
     * otherwise cancels the contract and send a notification to the client.
     *
     * @param contractId  id of the contract to be canceled.
     * @return OK if the request was created or if the contract was canceled. Otherwise, an appropriate HTTP status code.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<?> cancelContract(@PathVariable("id") ObjectId contractId) {

        try {
            contractService.cancelContract(contractId);
            return ResponseEntity.status(HttpStatus.OK).build();

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET method to get the current authenticated supplier offers.
     *
     * @return OK And the offers of the authenticated supplier. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/supplier_offers")
    public ResponseEntity<?> getSupplierOffers() {

        try {
            return new ResponseEntity<>(contractService.getSupplierOffers(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Private method used by createSimpleOffer and createGazElecOffer to create
     * an offer for the current authenticated supplier.
     *
     * @param offerDto DTO that contains the infos for the new offer
     * @return OK if the offer was created. Otherwise, an appropriate HTTP status code.
     */
    private ResponseEntity<?> createOffer(OfferDto offerDto) {

        try {
            return new ResponseEntity<>(contractService.createOffer(offerDto), HttpStatus.OK);

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * POST method to create a simple offer.
     *
     * @param offerDto DTO that contains the infos for the offer
     * @return OK if the offer was created. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PostMapping("/offer")
    public ResponseEntity<?> createSimpleOffer(@RequestBody SimpleOfferDto offerDto) {
        return createOffer(offerDto);
    }

    /**
     * POST method to create a gaz elec offer.
     *
     * @param offerDto DTO that contains the infos for the offer
     * @return OK if the offer was created. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PostMapping("/offer_gaz_elec")
    public ResponseEntity<?> createGazElecOffer(@RequestBody GazElecOfferDto offerDto) {
        return createOffer(offerDto);
    }

    /**
     * GET method to get an offer by its id.
     *
     * @param offerId The id of the offer
     * @return OK and the offer if succeeded. Otherwise, an appropriate HTTP status code.
     */
    @GetMapping("/offer/{id}")
    public ResponseEntity<?> getOffer(@PathVariable("id") ObjectId offerId) {

        try {
            return new ResponseEntity<>(contractService.getOffer(offerId), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * DELETE method to delete an offer.
     *
     * @param offerId The id of the offer to be deleted.
     * @return OK if the offer was deleted. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @DeleteMapping("/offer/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable("id") ObjectId offerId) {

        try {
            contractService.deleteOffer(offerId);
            return ResponseEntity.ok().body("Deleted");

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * PUT method to accept a contract request.
     *
     * @param contractId The id of the contract to be accepted.
     * @return OK if the contract was accepted. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptContract(@PathVariable("id") ObjectId contractId) {

        try {
            contractService.acceptContract(contractId);
            return ResponseEntity.ok().build();

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
