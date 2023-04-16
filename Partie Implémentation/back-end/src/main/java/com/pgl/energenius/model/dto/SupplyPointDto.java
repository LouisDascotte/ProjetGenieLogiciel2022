package com.pgl.energenius.model.dto;

import com.pgl.energenius.model.SupplyPoint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplyPointDto {

    private String EAN;

    private SupplyPoint.Type type;
}
