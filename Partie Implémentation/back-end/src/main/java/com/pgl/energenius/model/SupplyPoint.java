package com.pgl.energenius.model;

import com.pgl.energenius.enums.SupplyPointType;
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
    private SupplyPointType supplyPointType;
}
