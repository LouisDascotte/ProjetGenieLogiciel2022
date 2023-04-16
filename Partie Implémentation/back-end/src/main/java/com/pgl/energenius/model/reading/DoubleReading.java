package com.pgl.energenius.model.reading;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class DoubleReading extends Reading {

    /**
     * The day value of the reading
     */
    private int dayValue;

    /**
     * The night value of the reading
     */
    private int nightValue;
}
