package com.pgl.energenius.model.contract;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * The SimpleContract class represents a contract that has one energy type.
 */
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SimpleContract extends Contract {

    @NotNull
    @Size(min = 18, max = 18)
    private String EAN;
}
