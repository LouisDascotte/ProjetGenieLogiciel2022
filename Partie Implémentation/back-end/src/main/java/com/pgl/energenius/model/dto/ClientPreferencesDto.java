package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.Lang;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientPreferencesDto {

    private Lang lang;

    @Size(min = 8)
    private String old_password;

    @Size(min = 8)
    private String new_password;

    private ObjectId favoritePortfolioId;
}
