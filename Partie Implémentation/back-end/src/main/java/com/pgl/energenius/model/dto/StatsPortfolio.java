package com.pgl.energenius.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Extension 4: The StatsPortfolio class represents a DTO for the statistical analysis for a portfolio.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatsPortfolio {

    private int average;

    private int max;

    private int min;

    private int standard_deviation;
}
