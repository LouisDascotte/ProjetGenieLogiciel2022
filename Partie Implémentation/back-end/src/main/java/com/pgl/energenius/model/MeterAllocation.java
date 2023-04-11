package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * The allocation of a meter
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "meter_allocations")
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

    private ObjectId clientId;

    private String SupplierName;

    private Status status;

    public enum Status {
        ACTIVE,
        ENDED
    }
}
