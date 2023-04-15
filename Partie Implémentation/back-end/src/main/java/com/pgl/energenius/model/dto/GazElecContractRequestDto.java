package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GazElecContractRequestDto {

    private String EAN_GAZ;

    private String EAN_ELEC;

    private MeterType meterType;

    private String address;
}
