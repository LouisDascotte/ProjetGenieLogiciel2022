package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
/**
 * The allocation of a meter
 */
public class MeterAllocation {
    /**
     * The EAN of the meter
     */
    private String EAN;

    /**
     * The date of the start of the allocation of the meter
     */
    private Date assignmentDate;

    /**
     * The date of expiration of the meter's allocation
     */
    private Date expirationDate;
}
