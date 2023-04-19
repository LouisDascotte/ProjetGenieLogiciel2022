package com.pgl.energenius.model.dto;

import com.pgl.energenius.enums.Lang;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierPreferenceDto {

    private Lang lang;

    @Size(min = 8)
    private String old_password;

    @Size(min = 8)
    private String new_password;
}
