package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * A supplier
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "suppliers")
public class Supplier {

    /**
     * The ID of the supplier
     */
    @Id
    private ObjectId id;

    /**
     * The name of the supplier
     */
    private String name;

    /**
     * The region in which the supplier operates
     */
    private String operatingRegion; // TODO

    /**
     * Create a supplier
     * @param name
     * @param operatingRegion
     */
    public Supplier(String name, String operatingRegion) {
        id = new ObjectId();
        this.name = name;
        this.operatingRegion = operatingRegion;
    }
}
