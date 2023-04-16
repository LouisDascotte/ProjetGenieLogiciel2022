package com.pgl.energenius.model.offer;

import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Offer that the supplier makes
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "offers")
public abstract class Offer {

    /**
     * The ID of the offer
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

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
