package com.pgl.energenius.Objects.DTOs;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Portfolio Data Transfer Object
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PortfolioDto {

  /**
   * The name of the portfolio
   */
  @JsonProperty("name")
  private String name;

  /**
   * The address of the portfolio
   */
  @JsonProperty("address")
  private String address;
}
