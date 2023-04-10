package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date date;

    /**
     * The value of the reading
     */
    private int value;
}
