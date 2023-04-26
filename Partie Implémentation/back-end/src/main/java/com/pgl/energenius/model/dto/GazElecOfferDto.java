package com.pgl.energenius.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The GazElecOfferDto class represents a DTO for the GazElecOffer object.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GazElecOfferDto extends OfferDto {

    @NotNull
    private double cost_ELEC;

    @NotNull
    private double nightCost_ELEC;

    @NotNull
    private double cost_GAZ;

    @NotNull
    private double nightCost_GAZ;
}
