package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * The reading of a meter
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reading {

    /**
     * the date of the reading
     */
    private Date date;

    /**
     * The value of the reading
     */
    private int value;
}
