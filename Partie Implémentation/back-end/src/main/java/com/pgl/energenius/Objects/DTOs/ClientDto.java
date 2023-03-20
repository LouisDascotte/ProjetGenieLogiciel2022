package com.pgl.energenius.Objects.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Client Data Transfert Object
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {

    /**
     * The first name of the client
     */
    @NotBlank
    @JsonProperty("firstName")
    private String firstName;

    /**
     * The last name of the client
     */
    @NotBlank
    @JsonProperty("lastName")
    private String lastName;

    /**
     * The email of the client
     */
    @JsonProperty("email")
    private String email;

    /**
     * The phone number of the client
     */
    @NotBlank
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    /**
     * The address of the client
     */
    @JsonProperty("address")
    private String address;

    /**
     * The city of the client
     */
    @JsonProperty("city")
    private String city;

    /**
     * The country of the client
     */
    @JsonProperty("country")
    private String country;


    /**
     * The postal code of the client
     */
    @JsonProperty("postalCode")
    private String postalCode;

    /**
     * The prefered language of the client
     */
    @JsonProperty("language")
    private String language;

    /**
     * The password of the client. Minimum size of 8 characters
     */
    @NotBlank
    @Size(min = 8)
    @JsonProperty("password")
    private String password;
}
