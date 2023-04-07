package com.pgl.energenius.Objects.DTOs;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Client Login Data Transfer Object
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientLoginDto {

    /**
     * The email used by the client
     */
    @NotNull
    private String email;

    /**
     * The password used by the client
     */
    @NotNull
    private String password;
}
