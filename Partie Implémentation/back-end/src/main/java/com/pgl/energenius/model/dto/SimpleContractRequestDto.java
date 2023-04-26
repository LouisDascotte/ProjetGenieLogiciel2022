package com.pgl.energenius.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The SimpleContractRequestDto class represents a DTO for the SimpleContract object.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleContractRequestDto {

    @NotNull
    private EnergyType energyType;

    @NotBlank
    @JsonProperty("EAN")
    private String EAN;

    @NotNull
    private MeterType meterType;

    @NotBlank
    private String address;

    @NotNull
    private HourType hourType;
}
