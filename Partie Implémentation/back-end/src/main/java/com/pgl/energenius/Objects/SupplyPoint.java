package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.SupplyPointType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@AllArgsConstructor
public class SupplyPoint {

    @DBRef(lazy = true)
    private Meter meter;

    private EnergyType energyType;
    private SupplyPointType supplyPointType;
}
