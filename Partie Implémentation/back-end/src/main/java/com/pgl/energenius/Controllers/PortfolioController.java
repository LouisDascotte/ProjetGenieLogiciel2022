package com.pgl.energenius.Controllers;

import com.pgl.energenius.Exception.*;
import com.pgl.energenius.Objects.*;
import com.pgl.energenius.Objects.DTOs.PortfolioDto;
import com.pgl.energenius.Objects.DTOs.SupplyPointDto;
import com.pgl.energenius.Services.PortfolioService;
import com.pgl.energenius.enums.EnergyType;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * The PortfolioController class handles all HTTP requests related to Portfolios.
 */
@RestController
@RequestMapping("/api/client/portfolio")
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
            return new ResponseEntity<>(portfolioService.getAllPortfolios(), HttpStatus.OK);

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
    @PostMapping("/create")
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
    @GetMapping("/consumption")
    public ResponseEntity<?> getConsumption(@RequestParam ObjectId portfolioId) {

        try {
            HashMap<EnergyType, List<Reading>> readings = portfolioService.getPortfolioConsumption(portfolioId);
            return new ResponseEntity<>(readings, HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam ObjectId portfolioId) {

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

    @PostMapping("/supply_point/add")
    public ResponseEntity<?> createSupplyPoint(@RequestParam ObjectId portfolioId, @RequestBody SupplyPointDto supplyPointDto) {

        try {
            SupplyPoint supplyPoint = portfolioService.createSupplyPoint(portfolioId, supplyPointDto);
            return new ResponseEntity<>(supplyPoint, HttpStatus.CREATED);

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
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

    @DeleteMapping("/supply_point/delete")
    public ResponseEntity<?> deleteSupplyPoint(@RequestParam ObjectId portfolioId, @RequestParam String EAN) {

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

}
