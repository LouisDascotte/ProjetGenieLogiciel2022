package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.ContractType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.enums.OfferType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Offer that the supplier makes
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "offers")
public class Offer {

    /**
     * The ID of the offer
     */
    @Id
    private ObjectId id;

    /**
     * The type of the offer
     */
    private OfferType offerType;

    /**
     * The type of the meter used in the offer
     */
    private MeterType meterType;

    /**
     * The length of the contract
     */
    private int contractLength;

    /**
     * The offer's cost
     */
    private int cost;

    /**
     * The type of the contract
     */
    private ContractType contractType;

    /**
     * The supplier in the offer
     */
    @DBRef(lazy = true)
    private Supplier supplier;

    /**
     * Create an offer
     * @param offerType
     * @param meterType
     * @param contractLength
     * @param cost
     * @param contractType
     * @param supplier
     */
    public Offer(OfferType offerType, MeterType meterType, int contractLength, int cost, ContractType contractType, Supplier supplier) {
        id = new ObjectId();
        this.offerType = offerType;
        this.meterType = meterType;
        this.contractLength = contractLength;
        this.cost = cost;
        this.contractType = contractType;
        this.supplier = supplier;
    }
}
