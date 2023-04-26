package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.Lang;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * The ClientPreferencesDto class represents a DTO for the preferences of a Client object.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientPreferencesDto {

    @NotNull
    private Lang lang;

    // Can be null
    @Size(min = 8)
    private String old_password;

    // Can be null
    @Size(min = 8)
    private String new_password;

    @NotNull
    private ObjectId favoritePortfolioId;
}
