package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterStatus;
import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "meters")
/**
 * Meter of a client
 */
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
    private List<Reading> readings;

    /**
     * Create a meter
     * @param EAN
     * @param energyType
     * @param meterStatus
     * @param hourType
     * @param meterType
     */
    public Meter(String EAN, EnergyType energyType, MeterStatus meterStatus, HourType hourType, MeterType meterType) {
        this.EAN = EAN;
        this.energyType = energyType;
        this.meterStatus = meterStatus;
        this.hourType = hourType;
        this.meterType = meterType;
        readings = new ArrayList<>();
    }
}
