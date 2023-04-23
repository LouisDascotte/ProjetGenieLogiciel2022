package com.pgl.energenius.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GazElecOfferDto extends OfferDto {

    private double cost_ELEC;

    private double nightCost_ELEC;

    private double cost_GAZ;

    private double nightCost_GAZ;
}
