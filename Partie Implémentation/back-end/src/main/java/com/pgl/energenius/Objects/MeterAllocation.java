package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class MeterAllocation {

    private String EAN;
    private Date assignmentDate;
    private Date expirationDate;
}
