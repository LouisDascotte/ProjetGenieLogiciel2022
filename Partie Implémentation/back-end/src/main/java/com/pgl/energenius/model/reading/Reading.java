package com.pgl.energenius.model.reading;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * The reading of a meter
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "readings")
@CompoundIndex(def = "{'EAN':1, 'date':2}", unique = true)
public abstract class Reading {

    private String EAN;

    /**
     * the date of the reading
     */
    private String date;

    private Status status;

    public enum Status {
        PENDING,
        ACCEPTED
    }
}
