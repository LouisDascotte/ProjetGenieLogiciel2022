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

  @JsonProperty("supply_point")
  private String ean; 


  @JsonProperty("supplier")
  private String supplier; 

  /**
   * The address of the portfolio
   */
  @JsonProperty("address")
  private String address;

  @JsonProperty("energy_type")
  private String energy_type; 
}
