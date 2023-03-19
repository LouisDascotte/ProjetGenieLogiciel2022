package com.pgl.energenius.Objects.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientDto {

    @NotBlank
    @JsonProperty("firstName")
    private String firstName;

    @NotBlank
    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("email")
    private String email;

    @NotBlank
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @JsonProperty("address")
    private String address;

    @JsonProperty("city")
    private String city; 

    @JsonProperty("country")
    private String country; 


    @JsonProperty("postalCode")
    private String postalCode; 

    @JsonProperty("language")
    private String language; 

    @NotBlank
    @Size(min = 8)
    @JsonProperty("password")
    private String password;

    public ClientDto(){}
}
