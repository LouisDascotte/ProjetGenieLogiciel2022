package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.model.offer.Offer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleOfferDto extends OfferDto {

    private EnergyType energyType;
}
