package com.pgl.energenius.model.offer;

import lombok.experimental.SuperBuilder;

@SuperBuilder
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
