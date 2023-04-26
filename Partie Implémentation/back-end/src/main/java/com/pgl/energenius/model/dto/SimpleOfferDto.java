package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.EnergyType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The SimpleOfferDto class represents a DTO for the SimpleOffer object.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleOfferDto extends OfferDto {

    @NotNull
    private double cost;

    @NotNull
    private double nightCost;

    @NotNull
    private EnergyType energyType;
}
