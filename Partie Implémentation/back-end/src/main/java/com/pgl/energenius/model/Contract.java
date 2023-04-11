package com.pgl.energenius.model;

import com.pgl.energenius.enums.ContractType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * The contract of a client
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "contracts")
public class Contract {

    /**
     * The ID of the client
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

    /**
     * The date of the beginning of the contract
     */
    private Date beginDate;

    /**
     * The date of the end of the contract
     */
    private Date endDate;

    /**
     * The id of client that the contract is linked to
     */
    private ObjectId clientId;

    /**
     * The id of supplier of the contract
     */
    private ObjectId supplierId;

    /**
     * The type of contract
     */
    private ContractType contractType;

    /**
     * The id of the first meter linked to the contract
     */
    private ObjectId meterId_1;

    /**
     * The id of the second meter linked to the contract, if there is any
     */
    private ObjectId meterId_2;

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
     * The id of the portfolio containing the contract
     */
    private ObjectId portfolioId;
}
