package com.pgl.energenius.model;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterStatus;
import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Meter of a client
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "meters")
public class Meter {

    /**
     * The EAN of the meter
     */
    @Id
    private String EAN;

    /**
     * The type of energy of the meter
     */
    private EnergyType energyType;

    /**
     * The status of the meter
     */
    private MeterStatus meterStatus;

    /**
     * The type of time setting that the meter uses (ex : bi-monthly)
     */
    private HourType hourType;

    /**
     * The type of meter
     */
    private MeterType meterType;

    /**
     * The readings of the meter
     */
    @Default
    private List<Reading> readings = new ArrayList<>();

    private ObjectId supplierId;

    private ObjectId clientId;
}
