package com.pgl.energenius.model;

import com.pgl.energenius.enums.Lang;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Employee of a supplier
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "suppliers")
public class Supplier {

    /**
     * The ID of the supplier
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

    /**
     * The preferred language of the supplier
     */
    private Lang lang;

    /**
     * The name of the supplier
     */
    @Indexed(unique = true)
    private String name;

    /**
     * The region in which the supplier operates
     */
    private List<String> operatingAreas;
}
