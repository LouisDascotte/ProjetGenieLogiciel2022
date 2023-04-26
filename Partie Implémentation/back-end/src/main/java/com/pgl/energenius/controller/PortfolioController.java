package com.pgl.energenius.controller;

import com.pgl.energenius.exception.*;
import com.pgl.energenius.model.Portfolio;
import com.pgl.energenius.model.SupplyPoint;
import com.pgl.energenius.model.dto.PortfolioDto;
import com.pgl.energenius.model.dto.ProductionPointDto;
import com.pgl.energenius.model.dto.SupplyPointDto;
import com.pgl.energenius.service.PortfolioService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * The PortfolioController class handles all HTTP requests related to Portfolios.
 */
@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    /**
     * GET method to get all portfolios of the authenticated client.
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
     * POST method to create a portfolio for the authenticated client.
     *
     * @param portfolioDto DTO that contains all the information to create the portfolio
     * @return CREATED and the portfolio if successfully created. Otherwise, an appropriate HTTP status code.
     */
    @PostMapping
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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
     * GET method to retrieve the consumption readings for a portfolio.
     *
     * @param portfolioId The id of the portfolio to retrieve the consumption readings for
     * @return the consumption readings for the portfolio
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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

    /**
     * DELETE method to delete a portfolio of the authenticated client.
     *
     * @param portfolioId The id of the portfolio to be deleted
     * @return OK if successfully deleted. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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

    /**
     * POST method to create a supply point in a portfolio of the authenticated client. Cannot add a supply point if
     * the meter associated with the same EAN is not affected to the authenticated client.
     *
     * @param portfolioId The id of the portfolio
     * @param supplyPointDto DTO that contains the information to create the supply point.
     * @return OK and the supply point if successfully created. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * Extension 5: POST method to create a production point in a portfolio of the authenticated client and create a meter
     * (that awaits for approval from the supplier) associated with the production point.
     *
     * @param portfolioId The id of the portfolio
     * @param productionPointDto DTO that contains the information to create the production point.
     * @return OK and the production point if successfully created. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/{id}/production_point")
    public ResponseEntity<?> createProductionPoint(@PathVariable("id") ObjectId portfolioId, @RequestBody ProductionPointDto productionPointDto) {

        try {
            SupplyPoint supplyPoint = portfolioService.createSupplyPoint(portfolioId, productionPointDto);
            return new ResponseEntity<>(supplyPoint, HttpStatus.CREATED);

        } catch (UnauthorizedAccessException | InvalidUserDetailsException | AddressesNotEqualsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (ObjectAlreadyExitsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * DELETE method to delete a supply point in a portfolio of the authenticated client.
     *
     * @param portfolioId The id of the portfolio
     * @param EAN The EAN associated to the supply point
     * @return OK if the supplyPoint was successfully deleted. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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

    /**
     * GET method to get the consumption of a supply point in a portfolio of the authenticated client.
     *
     * @param portfolioId The id of the portfolio
     * @param EAN The EAN associated to the supply point
     * @return OK and the consumption of the supply point if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
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

    /**
     * GET method to get the name and id of all the portfolios of the authenticated client.
     *
     * @return OK and the name and id of all the portfolios if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/names")
    public ResponseEntity<?> getPortfolioIdsAndNames() {

        try {
            return new ResponseEntity<>(portfolioService.getPortfolioIdsAndNames(), HttpStatus.OK);

        } catch (InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Extension 5: PUT method to accept the production point
     *
     * @param EAN The EAN of the production point to be accepted
     * @param portfolioId The id of portfolio
     * @return OK if successfully accepted. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/accept_production_point")
    public ResponseEntity<?> acceptProductionPoint(@RequestParam String EAN, @PathVariable("id") ObjectId portfolioId) {

        try {
            portfolioService.acceptProductionPoint(EAN);
            return ResponseEntity.ok().build();

        } catch (ObjectNotValidatedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Extension 5: POST method to request a green certificate for the portfolio of the authenticated client.
     *
     * @param portfolioId The id of the portfolio
     * @return OK if successfully requested the green certificate. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping("/{id}/request_green_certificate")
    public ResponseEntity<?> requestGreenCertificate(@PathVariable("id") ObjectId portfolioId) {

        try {
            portfolioService.requestGreenCertificate(portfolioId);
            return ResponseEntity.ok().build();

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

    /**
     * Extension 5: GET method to get the green certificates for the portfolio of the authenticated client.
     *
     * @param portfolioId The id of the portfolio
     * @return OK and the green certificates. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/{id}/green_certificates")
    public ResponseEntity<?> getGreenCertificates(@PathVariable("id") ObjectId portfolioId) {

        try {
            return new ResponseEntity<>(portfolioService.getGreenCertificates(portfolioId), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * Extension 5: PUT method to accept a green certificate by the authenticated supplier.
     *
     * @param portfolioId The id of the portfolio
     * @return OK if successfully accepted the green certificate. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_SUPPLIER')")
    @PutMapping("/{id}/accept_green_certificate")
    public ResponseEntity<?> acceptGreenCertificate(@PathVariable("id") ObjectId portfolioId) {

        try {
            portfolioService.acceptGreenCertificate(portfolioId);
            return ResponseEntity.ok().build();

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Extension 4: GET method to get a statistical analysis of the portfolio of the authenticated client.
     *
     * @param portfolioId The id of the portfolio
     * @return OK and the analysis of the portfolio if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/{id}/stats")
    public ResponseEntity<?> getPortfolioStats(@PathVariable("id") ObjectId portfolioId) {

        try {
            return new ResponseEntity<>(portfolioService.getPortfolioStats(portfolioId), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Extension 4: GET method to get a statistical analysis of all the portfolios.
     *
     * @return OK and the analysis of all the portfolio if successful. Otherwise, an appropriate HTTP status code.
     */
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @GetMapping("/{id}/average_stats")
    public ResponseEntity<?> getAverageOfAllPortfolios() {

        try {
            return new ResponseEntity<>(portfolioService.getAverageOfAllPortfolios(), HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
