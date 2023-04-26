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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * The ClientController class handles all HTTP requests related to Clients
 */
@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private SecurityUtils securityUtils;

    /**
     * GET method to retrieve the current client's login details.
     *
     * @return OK and Client's login details if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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

    /**
     * GUT method to edit the current client's preferences.
     *
     * @param clientPreferencesDto DTO containing the new preferences of the client.
     * @return OK and Client's details if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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
