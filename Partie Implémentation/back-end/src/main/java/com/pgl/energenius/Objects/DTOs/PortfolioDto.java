package com.pgl.energenius.Objects.DTOs;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
/**
 * Client Portfolio
 */
public class PortfolioDto {

  /**
   * The client that owns the portfolio
   */
  @JsonProperty("client")
  private String client;

  /**
   * The address of the client
   */
  @JsonProperty("address")
  private String address;

  /**
   * The name of the portfolio
   */
  @JsonProperty("name")
  private String name;

  public PortfolioDto(){}
}
