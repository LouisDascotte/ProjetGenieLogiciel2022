package com.pgl.energenius.model.contract;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The contract of a client
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "contracts")
public abstract class Contract {

    /**
     * The ID of the client
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

    /**
     * The date of the beginning of the contract
     */
    private String beginDate;

    /**
     * The date of the end of the contract
     */
    private String endDate;

    /**
     * The id of client that the contract is linked to
     */
    private ObjectId clientId;

    /**
     * The id of supplier of the contract
     */
    private ObjectId supplierId;

    private Type type;

    /**
     * The current status of the contract
     */
    @Default
    private Status status = Status.PENDING;

    private ObjectId offerId;

    public enum Status {
        PENDING,
        ACCEPTED
    }

    public enum Type {
        SIMPLE_CONTRACT,
        GAZ_ELEC_CONTRACT
    }
}
