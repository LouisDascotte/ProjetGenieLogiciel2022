package com.pgl.energenius.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The ClientLoginDto class represents a DTO for the ClientLogin class.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientLoginDto {

    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;
}
