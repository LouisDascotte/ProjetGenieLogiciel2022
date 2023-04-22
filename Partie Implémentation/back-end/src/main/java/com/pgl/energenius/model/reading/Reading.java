package com.pgl.energenius.model.reading;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * The reading of a meter
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "readings")
@CompoundIndex(def = "{'EAN':1, 'date':2}", unique=true)
public abstract class Reading {

    @Id
    @Default
    private ObjectId id = new ObjectId();

    private String EAN;

    /**
     * the date of the reading
     */
    //@Indexed(unique = true)
    private String date;

    private Status status;

    public enum Status {
        PENDING,
        ACCEPTED
    }
}
