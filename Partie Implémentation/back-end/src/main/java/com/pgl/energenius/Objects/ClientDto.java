package com.pgl.energenius.Objects;

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

    @NotBlank
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @JsonProperty("email")
    private String email;

    @JsonProperty("address")
    private String address;

    @JsonProperty("city")
    private String city; 

    @JsonProperty("language")
    private String language; 

    @JsonProperty("country")
    private String country; 

    @JsonProperty("postalCode")
    private String postalCode; 

    @NotBlank
    @Size(min = 8)
    @JsonProperty("password")
    private String password;

    public ClientDto(){}
}
