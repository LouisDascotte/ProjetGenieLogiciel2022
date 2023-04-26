package com.pgl.energenius.model.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.pgl.energenius.model.Address;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The PortfolioDto class represents a DTO for the Portfolio object.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PortfolioDto {

  @NotBlank
  @JsonProperty("name")
  private String name;

  @NotBlank
  @JsonProperty("address")
  private String address;
}
