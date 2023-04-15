package com.pgl.energenius.model.contract;

import com.pgl.energenius.model.offer.SimpleOffer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SimpleContract extends Contract {

    /**
     * The EAN of the meter linked to the contract
     */
    private String EAN;
}
