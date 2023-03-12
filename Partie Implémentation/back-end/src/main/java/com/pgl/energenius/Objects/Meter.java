package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterStatus;
import com.pgl.energenius.enums.MeterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "meters")
public class Meter {

    @Id
    private String EAN;

    private EnergyType energyType;
    private MeterStatus meterStatus;
    private HourType hourType;
    private MeterType meterType;
    private List<Reading> readings;

    public Meter(String EAN, EnergyType energyType, MeterStatus meterStatus, HourType hourType, MeterType meterType) {
        this.EAN = EAN;
        this.energyType = energyType;
        this.meterStatus = meterStatus;
        this.hourType = hourType;
        this.meterType = meterType;
        readings = new ArrayList<>();
    }
}
