package com.pgl.energenius.model.contract;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class GazElecContract extends Contract {

    /**
     * The EAN of the meter linked to the contract
     */

    private String EAN_ELEC;

    private String EAN_GAZ;
}
