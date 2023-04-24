package com.pgl.energenius.model;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Meter
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
    @NotNull
    private String EAN;

    /**
     * The type of energy of the meter
     */
    @NotNull
    private EnergyType energyType;

    /**
     * The status of the meter
     */
    @Default
    @NotNull
    private Status status = Status.AWAITING_APPROVAL;

    /**
     * The type of time setting that the meter uses (ex : bi-monthly)
     */
    @NotNull
    private HourType hourType;

    /**
     * The type of meter
     */
    @NotNull
    private MeterType meterType;

    private ObjectId supplierId;

    private ObjectId clientId;

    @NotNull
    private String address;

    public enum Status {
        AFFECTED,
        DISAFFECTED,
        AWAITING_APPROVAL
    }

}
