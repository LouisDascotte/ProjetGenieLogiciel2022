package com.pgl.energenius.Objects.DTOs;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PortfolioDto {

  @JsonProperty("client")
  private String client; 

  @JsonProperty("address")
  private String address; 

  @JsonProperty("name")
  private String name;

  public PortfolioDto(){}
}
