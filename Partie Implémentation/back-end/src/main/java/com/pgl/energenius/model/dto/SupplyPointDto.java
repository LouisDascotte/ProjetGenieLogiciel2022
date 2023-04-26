package com.pgl.energenius.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pgl.energenius.model.SupplyPoint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The SupplyPointDto class represents a DTO for the SupplyPoint object.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplyPointDto {

    @NotBlank
    @JsonProperty("EAN")
    private String EAN;

    @NotNull
    private SupplyPoint.Type type;
}
