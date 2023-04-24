package com.pgl.energenius.model.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class GazElecOffer extends Offer {

    /**
     * The offer's cost
     */
    private double cost_ELEC;

    private double nightCost_ELEC;

    /**
     * The offer's cost
     */
    private double cost_GAZ;

    private double nightCost_GAZ;
}
