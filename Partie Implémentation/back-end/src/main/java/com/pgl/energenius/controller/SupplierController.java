package com.pgl.energenius.controller;

import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.service.ClientService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.dto.SupplierPreferenceDto;
import com.pgl.energenius.service.SupplierService;

/**
 * The EmployeeController class handles all HTTP requests related to employees
 */
@RestController
@RequestMapping("/api/supplier")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private ClientService clientService;

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
