package com.pgl.energenius.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The ProductionPointDto class represents a DTO for the ProductionPoint object.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductionPointDto extends SupplyPointDto {

    @NotBlank
    private String supplierName;
}
