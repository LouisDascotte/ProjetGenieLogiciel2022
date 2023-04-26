package com.pgl.energenius.controller;

import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.service.ClientService;
import com.pgl.energenius.utils.SecurityUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.dto.SupplierPreferenceDto;
import com.pgl.energenius.service.SupplierService;
import com.pgl.energenius.utils.SecurityUtils;

/**
 * The EmployeeController class handles all HTTP requests related to suppliers
 */
@RestController
@RequestMapping("/api/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private SecurityUtils securityUtils;

    /**
     * GET method to get the current authenticated supplier.
     *
     * @return OK and the current authenticated supplier if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/me")
    public ResponseEntity<?> getSupplier() {

        try {
            return new ResponseEntity<>(securityUtils.getCurrentSupplierLogin(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT method to edit the preferences of the current authenticated supplier.
     *
     * @param supplierPreferenceDto DTO that contains the new preferences for the supplier
     * @return OK and the preferences was successfully updated. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/me")
    public ResponseEntity<?> editPreferences(@RequestBody SupplierPreferenceDto supplierPreferenceDto) {

        try {
            return new ResponseEntity<>(supplierService.editPreferences(supplierPreferenceDto), HttpStatus.OK);

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET method to get the name and id of the clients that have a contract with the current authenticated supplier.
     *
     * @return OK and the name and id of the clients of the supplier if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/clients")
    public ResponseEntity<?> getClients() {

        try {
            return new ResponseEntity<>(supplierService.getClientsNameAndId(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * GET method to get a client of the current authenticated supplier.
     *
     * @param clientId The id of the client
     * @return OK and the client of the supplier if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @GetMapping("/client/{id}")
    public ResponseEntity<?> getClient(@PathVariable("id") ObjectId clientId) {

        try {
            return new ResponseEntity<>(clientService.getClient(clientId), HttpStatus.OK);

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
