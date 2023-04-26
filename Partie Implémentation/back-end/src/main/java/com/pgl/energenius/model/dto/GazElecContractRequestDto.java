package com.pgl.energenius.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GazElecContractRequestDto {

    @JsonProperty("EAN_GAZ")
    private String EAN_GAZ;

    @JsonProperty("EAN_ELEC")
    private String EAN_ELEC;

    private MeterType meterType;

    private String address;

    private HourType hourType;
}
