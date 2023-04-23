package com.pgl.energenius.model.reading;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.Builder.Default;

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
