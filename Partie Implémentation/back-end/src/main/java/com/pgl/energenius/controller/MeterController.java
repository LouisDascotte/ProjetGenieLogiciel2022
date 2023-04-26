package com.pgl.energenius.controller;


import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.service.MeterService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * The MeterController class handles all HTTP requests related to Meters.
 */
@RestController
@RequestMapping("/api/meter")
@CrossOrigin({"http://localhost:3000", "http://localhost:3001"})
public class MeterController {

    @Autowired
    private MeterService meterService;

    /**
     * GUT method to get the meters of the authenticated user.
     *
     * @return OK and authenticated user's meters. Otherwise, an appropriate HTTP status code.
     */
    @GetMapping("/all")
    public ResponseEntity<?> getMeters() throws InvalidUserDetailsException {

        return new ResponseEntity<>(meterService.getMeters(), HttpStatus.OK);
    }

    /**
     * GET method to get the meters allocations of the authenticated client.
     *
     * @return OK and authenticated client's meters allocations. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/allocations")
    public ResponseEntity<?> getAllocations() throws InvalidUserDetailsException {

        return new ResponseEntity<>(meterService.getMetersAllocations(), HttpStatus.OK);
    }

    /**
     * GET method to get the linked meters of a client, and if the authenticated user is a supplier
     * it returns only the meters that he can access.
     *
     * @param clientId The id of the client
     * @return OK and the client's linked meters. Otherwise, an appropriate HTTP status code.
     */
    @GetMapping("/linked")
    public ResponseEntity<?> getLinkedMetersEAN(@RequestParam ObjectId clientId) throws UnauthorizedAccessException, InvalidUserDetailsException {

        return new ResponseEntity<>(meterService.getLinkedMetersEAN(clientId), HttpStatus.OK);
    }

    /**
     * PUT method to link a meter to a client. Cannot link a meter if there is no contract associated with this meter.
     *
     * @param EAN The EAN of the meter
     * @param clientId The id of the client
     * @return OK if the meter was successfully linked. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/{id}/link")
    public ResponseEntity<?> linkMeter(@PathVariable("id") String EAN, @RequestParam ObjectId clientId) throws ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        meterService.linkMeter(EAN, clientId);
        return ResponseEntity.ok().build();
    }

    /**
     * PUT method to unlink a meter from a client. Cannot link a meter if there is no contract associated with this meter.
     *
     * @param EAN The EAN of the meter
     * @return OK if the meter was successfully linked. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/{id}/unlink")
    public ResponseEntity<?> unlinkMeter(@PathVariable("id") String EAN) throws ObjectNotValidatedException, ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        meterService.unlinkMeter(EAN);
        return ResponseEntity.ok().build();
    }
}
