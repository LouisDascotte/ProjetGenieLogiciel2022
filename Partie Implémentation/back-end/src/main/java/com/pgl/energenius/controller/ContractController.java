package com.pgl.energenius.controller;

import com.pgl.energenius.model.dto.OfferDto;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.dto.GazElecContractRequestDto;
import com.pgl.energenius.model.dto.SimpleContractRequestDto;
import com.pgl.energenius.service.ContractService;

@RestController
@RequestMapping("/api/contract")
@CrossOrigin(origins = "http://localhost:3000")
public class ContractController {

    @Autowired
    private ContractService contractService;

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

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/offers")
    public ResponseEntity<?> getSimpleOffers(@RequestParam HourType hourType, @RequestParam EnergyType energyType, @RequestParam String address) {

        try {
            return new ResponseEntity<>(contractService.getSimpleOffers(hourType, energyType, address), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

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

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping
    public ResponseEntity<?> createSimpleContractRequest(@RequestBody SimpleContractRequestDto contractRequest, @RequestParam String offerId) {
        ObjectId id = new ObjectId(offerId);
        System.out.println(id);
        try {
            contractService.createSimpleContractRequest(contractRequest, new ObjectId(offerId));
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

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

    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/supplier_offers")
    public ResponseEntity<?> getSupplierOffers() {

        try {
            return new ResponseEntity<>(contractService.getSupplierOffers(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PostMapping("/offer")
    public ResponseEntity<?> createOffer(@RequestBody OfferDto offerDto) {

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
}
