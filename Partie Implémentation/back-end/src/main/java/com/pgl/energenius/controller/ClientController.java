package com.pgl.energenius.controller;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.model.dto.ClientPreferencesDto;
import com.pgl.energenius.service.ClientService;
import com.pgl.energenius.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The ClientController class handles all HTTP requests related to Clients
 */
@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private SecurityUtils securityUtils;

    @GetMapping("/me")
    public ResponseEntity<?> getClient() {

        try {
            return new ResponseEntity<>(securityUtils.getCurrentClientLogin(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> editPreferences(@RequestBody ClientPreferencesDto clientPreferencesDto) {

        try {
            return new ResponseEntity<>(clientService.editPreferences(clientPreferencesDto), HttpStatus.OK);

        } catch (ObjectNotValidatedException e) {
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
