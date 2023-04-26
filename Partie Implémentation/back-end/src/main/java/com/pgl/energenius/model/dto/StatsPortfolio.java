package com.pgl.energenius.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatsPortfolio {

    private int average;

    private int max;

    private int min;

    private int standard_deviation;
}
