package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.SupplyPointType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * Supply point
 */
public class SupplyPoint {

    /**
     * The meter of the supply point
     */
    @DBRef(lazy = true)
    private Meter meter;

    /**
     * The type of energy of the meter
     */
    private EnergyType energyType;

    /**
     * The type of supply point
     */
    private SupplyPointType supplyPointType;
}
