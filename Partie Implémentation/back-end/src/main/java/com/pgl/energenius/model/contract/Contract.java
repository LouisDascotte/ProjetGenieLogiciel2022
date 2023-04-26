package com.pgl.energenius.model.contract;

import jakarta.validation.constraints.NotNull;
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
 * The Contract abstract class represents a contract in the EnergeniusApp.
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "contracts")
public abstract class Contract {

    @Id
    @Default
    private ObjectId id = new ObjectId();

    private String beginDate;

    private String endDate;

    @NotNull
    private ObjectId clientId;

    @NotNull
    private ObjectId supplierId;

    @NotNull
    private Type type;

    @Default
    @NotNull
    private Status status = Status.PENDING;

    @NotNull
    private ObjectId offerId;

    /**
     * The Status enum represents the different status of a contract
     */
    public enum Status {
        PENDING,
        ACCEPTED
    }

    /**
     * The Type enum represents the different types of contrat
     */
    public enum Type {
        SIMPLE_CONTRACT,
        GAZ_ELEC_CONTRACT
    }
}
