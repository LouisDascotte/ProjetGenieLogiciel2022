package com.pgl.energenius.controller;

import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.Portfolio;
import com.pgl.energenius.model.SupplyPoint;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.service.PortfolioService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The PortfolioController class handles all HTTP requests related to Portfolios.
 */
@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    /**
     * This method returns all portfolios of the connected client.
     *
     * @return A list of portfolios owned by the client
     */
    @GetMapping("/all")
    public ResponseEntity<?> getPortfolios() {

        try {
            return new ResponseEntity<>(portfolioService.getPortfolios(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * This method adds a portfolio to the database.
     *
     * @param portfolioDto The portfolio to add
     * @return A message confirming that the portfolio was added
     */
    @PostMapping
    @ResponseBody
    public ResponseEntity<?> create(@RequestBody PortfolioDto portfolioDto){

        try {
            Portfolio portfolio = portfolioService.createPortfolio(portfolioDto);
            return new ResponseEntity<>(portfolio, HttpStatus.CREATED);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Retrieves the consumption readings for a portfolio.
     *
     * @param portfolioId the ID of the portfolio to retrieve the consumption readings for
     * @return the consumption readings for the portfolio
     */
    @GetMapping("{id}/consumption")
    public ResponseEntity<?> getAllConsumption(@PathVariable("id") ObjectId portfolioId) {

        try {
            return new ResponseEntity<>(portfolioService.getPortfolioConsumption(portfolioId), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") ObjectId portfolioId) {

        try {
            portfolioService.deletePortfolio(portfolioId);
            return ResponseEntity.ok().build();

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{id}/supply_point")
    public ResponseEntity<?> createSupplyPoint(@PathVariable("id") ObjectId portfolioId, @RequestBody SupplyPointDto supplyPointDto) {

        try {
            SupplyPoint supplyPoint = portfolioService.createSupplyPoint(portfolioId, supplyPointDto);
            return new ResponseEntity<>(supplyPoint, HttpStatus.CREATED);

        } catch (UnauthorizedAccessException | InvalidUserDetailsException | AddressesNotEqualsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}/supply_point/{EAN}")
    public ResponseEntity<?> deleteSupplyPoint(@PathVariable("id") ObjectId portfolioId, @PathVariable String EAN) {

        try {
            portfolioService.deleteSupplyPoint(portfolioId, EAN);
            return ResponseEntity.ok().build();

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/supply_point/{EAN}/consumption")
    public ResponseEntity<?> getSupplyPointConsumption(@PathVariable("id") ObjectId portfolioId, @PathVariable String EAN) {

        try {
            return new ResponseEntity<>(portfolioService.getSupplyPointConsumption(portfolioId, EAN), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
