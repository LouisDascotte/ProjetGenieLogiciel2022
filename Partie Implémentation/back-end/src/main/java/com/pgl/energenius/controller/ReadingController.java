package com.pgl.energenius.controller;

import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meter")
@CrossOrigin("http://localhost:3000")
public class ReadingController {

    @Autowired
    private ReadingService readingService;

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
}
