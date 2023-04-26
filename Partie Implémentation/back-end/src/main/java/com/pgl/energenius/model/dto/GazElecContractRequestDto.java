package com.pgl.energenius.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The GazElecContractRequestDto class represents a DTO for the GazElecContract object.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GazElecContractRequestDto {

    @NotBlank
    @JsonProperty("EAN_GAZ")
    private String EAN_GAZ;

    @NotBlank
    @JsonProperty("EAN_ELEC")
    private String EAN_ELEC;

    @NotNull
    private MeterType meterType;

    @NotBlank
    private String address;

    @NotNull
    private HourType hourType;
}
