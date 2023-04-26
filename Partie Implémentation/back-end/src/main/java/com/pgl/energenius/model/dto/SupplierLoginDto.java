package com.pgl.energenius.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The SupplierLoginDto class represents a DTO for the SupplierLogin object.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierLoginDto {

    /**
     * The id used by the employee
     */
    @NotBlank
    private String loginId;

    /**
     * The password used by the employee
     */
    @NotBlank
    @Size(min = 8)
    private String password;
}
