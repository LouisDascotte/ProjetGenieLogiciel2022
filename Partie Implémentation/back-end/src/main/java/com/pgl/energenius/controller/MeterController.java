package com.pgl.energenius.controller;


import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.service.MeterService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meter")
@CrossOrigin("http://localhost:3000")
public class MeterController {

    @Autowired
    private MeterService meterService;

    @GetMapping("/all")
    public ResponseEntity<?> getMeters() {

        try {
            return new ResponseEntity<>(meterService.getMeters(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    @GetMapping("/allocations")
    public ResponseEntity<?> getAllocations() {

        try {
            return new ResponseEntity<>(meterService.getMetersAllocations(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/linked")
    public ResponseEntity<?> getLinkedMetersEAN(@RequestParam ObjectId clientId) {

        try {
            return new ResponseEntity<>(meterService.getLinkedMetersEAN(clientId), HttpStatus.OK);

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
