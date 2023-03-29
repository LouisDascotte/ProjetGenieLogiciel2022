package com.pgl.energenius.Objects.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Employee Login Data Transfer Object
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeLoginDto {

    /**
     * The id used by the employee
     */
    private String loginId;

    /**
     * The password used by the employee
     */
    private String password;
}
