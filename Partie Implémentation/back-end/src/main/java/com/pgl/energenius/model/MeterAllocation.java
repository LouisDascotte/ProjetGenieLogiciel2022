package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The allocation of a meter
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "meter_allocations")
public class MeterAllocation {

    @Id
    public ObjectId id;

    /**
     * The EAN of the meter
     */
    private String EAN;

    /**
     * The date of the start of the allocation of the meter
     */
    private String beginDate;

    /**
     * The date of expiration of the meter's allocation
     */
    private String endDate;

    private ObjectId clientId;

    private String supplierName;

    private Status status;

    public MeterAllocation(String EAN, String beginDate, String endDate, ObjectId clientId, String supplierName, Status status) {
        this.EAN = EAN;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.clientId = clientId;
        this.supplierName = supplierName;
        this.status = status;
        id = new ObjectId();
    }


    public enum Status {
        ACTIVE,
        ENDED
    }
}
