package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
//@Document(collection = "readings")
public class Reading {

//    @DBRef(lazy = true)
//    private Meter meter;

    private Date date;
    private int value;
}
