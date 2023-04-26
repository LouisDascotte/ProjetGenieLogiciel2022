package com.pgl.energenius.model.contract;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;

/**
 * The GazElecContract class represents a contract with both gas and elec energy type.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class GazElecContract extends Contract {

    @NotNull
    @Size(min = 18, max = 18)
    private String EAN_ELEC;

    @NotNull
    @Size(min = 18, max = 18)
    private String EAN_GAZ;
}
