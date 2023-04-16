package com.pgl.energenius.model.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Employee Login Data Transfer Object
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierLoginDto {

    /**
     * The id used by the employee
     */
    private String loginId;

    /**
     * The password used by the employee
     */
    @Size(min = 8)
    private String password;
}
