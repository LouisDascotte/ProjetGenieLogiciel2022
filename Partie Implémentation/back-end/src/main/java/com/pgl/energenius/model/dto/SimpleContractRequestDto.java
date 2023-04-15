package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleContractRequestDto {

    private EnergyType energy;

    private String EAN;

    private MeterType meterType;

    private String address;
}
