package com.pgl.energenius.model.offer;

import com.pgl.energenius.enums.EnergyType;
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
public class SimpleOffer extends Offer {

    private EnergyType energyType;
}
