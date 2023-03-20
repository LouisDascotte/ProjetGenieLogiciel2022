package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@Document(collection = "contracts")
/**
 * The contract of a client
 */
public class Contract {

    /**
     * The ID of the client
     */
    @Id
    private ObjectId id;

    /**
     * The date of the beginning of the contract
     */
    private Date beginDate;

    /**
     * The date of the end of the contract
     */
    private Date endDate;

    /**
     * The client that the contract is linked to
     */
    @DBRef(lazy = true)
    private Client client;

    /**
     * The supplier of the contract
     */
    @DBRef(lazy = true)
    private Supplier supplier;

    /**
     * The type of contract
     */
    private String contractType;

    /**
     * The first meter linked to the contract
     */
    @DBRef(lazy = true)
    private Meter meter1;

    /**
     * The second meter linked to the contract, if there is any
     */
    @DBRef(lazy = true)
    private Meter meter2;

    /**
     * The offer of the contract
     */
    @DBRef(lazy = true)
    private Offer offer;

    /**
     * The current status of the contract
     */
    private String status; // TODO enum ?

    /**
     * The portfolio containing the contract
     */
    @DBRef(lazy = true)
    private Portfolio portfolio;

    /**
     * Create a contract
     * @param beginDate
     * @param endDate
     * @param client
     * @param supplier
     * @param contractType
     * @param meter1
     * @param meter2
     * @param offer
     * @param status
     * @param portfolio
     */
    public Contract(Date beginDate, Date endDate, Client client, Supplier supplier, String contractType, Meter meter1, Meter meter2, Offer offer, String status, Portfolio portfolio) {
        id = new ObjectId();
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.client = client;
        this.supplier = supplier;
        this.contractType = contractType;
        this.meter1 = meter1;
        this.meter2 = meter2;
        this.offer = offer;
        this.status = status;
        this.portfolio = portfolio;
    }
}
