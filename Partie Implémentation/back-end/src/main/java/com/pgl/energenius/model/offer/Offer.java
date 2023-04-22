package com.pgl.energenius.model.offer;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.pgl.energenius.enums.HourType;

import lombok.AllArgsConstructor;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Offer that the supplier makes
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "offers")
public class Offer {

    /**
     * The ID of the offer
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

    /**
     * The type of the meter used in the offer
     */
    private HourType hourType;

    /**
     * The length of the contract
     */
    private int contractLength;

    /**
     * The offer's cost
     */
    private double cost;

    private double nightCost;

    /**
     * The type of the contract
     */
    private PriceType priceType;

    /**
     * The id of the supplier
     */
    private String supplierName;

    private Type type;

    public enum PriceType {
        FIXED_PRICE,
        VAR_PRICE
    }

    public enum Type {
        SIMPLE_OFFER,
        GAZ_ELEC_OFFER
    }
}
