package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Reading {

    private Date date;
    private int value;
}
