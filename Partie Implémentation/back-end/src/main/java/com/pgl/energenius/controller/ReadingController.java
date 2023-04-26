package com.pgl.energenius.controller;

import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.service.ReadingService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * The ReadingController class handles all HTTP requests related to Readings
 */
@RestController
@RequestMapping("/api/meter")
@CrossOrigin({"http://localhost:3000", "http://localhost:3001"})
public class ReadingController {

    @Autowired
    private ReadingService readingService;

    /**
     * POST method to create a simple reading for the authenticated client
     *
     * @param EAN The EAN of the meter
     * @param date The date of the reading
     * @param value The value of the reading
     * @param overwrite To overwrite a reading at the same date
     * @return CREATED and the reading if successfully create. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/{EAN}/reading")
    public ResponseEntity<?> createSimpleReading(@PathVariable String EAN, @RequestParam String date, @RequestParam int value, @RequestParam boolean overwrite) {

        try {
            SimpleReading reading = readingService.createSimpleReading(EAN, date, value, overwrite);
            return new ResponseEntity<>(reading, HttpStatus.CREATED);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException | ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotValidatedException | DateFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * POST method to create a double reading for the authenticated client.
     *
     * @param EAN The EAN of the meter
     * @param date The date of the reading
     * @param dayValue The day value of the reading
     * @param nightValue The night value of the reading
     * @param overwrite To overwrite a reading at the same date
     * @return CREATED and the reading if successfully create. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/{EAN}/reading/double")
    public ResponseEntity<?> createDoubleReading(@PathVariable String EAN, @RequestParam String date, @RequestParam int dayValue, @RequestParam int nightValue, @RequestParam boolean overwrite) {

        try {
            DoubleReading reading = readingService.createDoubleReading(EAN, date, dayValue, nightValue, overwrite);
            return new ResponseEntity<>(reading, HttpStatus.CREATED);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException | ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotValidatedException | DateFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * GET method to get the readings of the meter of the current authenticated user.
     *
     * @param EAN The EAN of the meter
     * @return OK and the readings of the meter if successful. Otherwise, an appropriate HTTP status code.
     */
    @GetMapping("/{EAN}/readings")
    public ResponseEntity<?> getReadings(@PathVariable String EAN) {

        try {
          return new ResponseEntity<>(readingService.getReadings(EAN), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE method to reject the reading by the authenticated supplier.
     *
     * @param readingId The id of the reading to be deleted
     * @return OK if the reading was successfully deleted. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @DeleteMapping("/reject_reading")
    public ResponseEntity<?> rejectReading(@RequestParam ObjectId readingId) {

        try {
            readingService.deleteReading(readingId);
            return ResponseEntity.ok().build();

        } catch (InvalidUserDetailsException | UnauthorizedAccessException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT method to edit a simple reading by the authenticated supplier.
     *
     * @param readingId The id of the reading to be edited
     * @param value The new value of the reading
     * @return OK if the reading was successfully edited. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/edit_reading")
    public ResponseEntity<?> editSimpleReading(@RequestParam ObjectId readingId, @RequestParam int value) {

        try {
            readingService.editSimpleReading(readingId, value);
            return ResponseEntity.ok().build();

        } catch (InvalidUserDetailsException | UnauthorizedAccessException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT method to edit a double reading by the authenticated supplier.
     *
     * @param readingId The id of the reading to be edited
     * @param dayValue The new day value of the reading
     * @param nightValue The new night value of the reading
     * @return OK if the reading was successfully edited. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/edit_double_reading")
    public ResponseEntity<?> editDoubleReading(@RequestParam ObjectId readingId, @RequestParam int dayValue, @RequestParam int nightValue) {

        try {
            readingService.editDoubleReading(readingId, dayValue, nightValue);
            return ResponseEntity.ok().build();

        } catch (InvalidUserDetailsException | UnauthorizedAccessException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
