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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
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
    public ResponseEntity<?> getClient() throws InvalidUserDetailsException {

        return new ResponseEntity<>(securityUtils.getCurrentClientLogin(), HttpStatus.OK);

    }

    /**
     * GUT method to edit the current client's preferences.
     *
     * @param clientPreferencesDto DTO containing the new preferences of the client.
     * @return OK and Client's details if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PutMapping("/me")
    public ResponseEntity<?> editPreferences(@RequestBody ClientPreferencesDto clientPreferencesDto) throws ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        return new ResponseEntity<>(clientService.editPreferences(clientPreferencesDto), HttpStatus.OK);
    }
}
