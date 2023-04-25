package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Supply point
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplyPoint {

    /**
     * The EAN of the supply point/meter
     */
    private String EAN;

    /**
     * The type of supply point
     */
    private Type type;

    public enum Type {
        SUPPLY_POINT,
        PRODUCTION_POINT // Extension 5
    }
}
