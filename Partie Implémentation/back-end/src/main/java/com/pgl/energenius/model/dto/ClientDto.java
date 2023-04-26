package com.pgl.energenius.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.pgl.energenius.enums.Lang;
import com.pgl.energenius.model.Address;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The ClientDto class represents a DTO for the Client object.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {

    @NotBlank
    @JsonProperty("firstName")
    private String firstName;

    @NotBlank
    @JsonProperty("lastName")
    private String lastName;

    @NotBlank
    @JsonProperty("email")
    private String email;

    @NotBlank
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @NotNull
    @JsonProperty("language")
    private Lang lang;

    @NotBlank
    @Size(min = 8)
    @JsonProperty("password")
    private String password;

    @NotBlank
    @JsonProperty("address")
    private String address;
}
