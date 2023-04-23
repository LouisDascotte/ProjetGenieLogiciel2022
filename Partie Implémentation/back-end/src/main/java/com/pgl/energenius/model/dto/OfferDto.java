package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.model.offer.Offer.PriceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class OfferDto {

    private HourType hourType;

    private int contractLength;

    private PriceType priceType;
}
