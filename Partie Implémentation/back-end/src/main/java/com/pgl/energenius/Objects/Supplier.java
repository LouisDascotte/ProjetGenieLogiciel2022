package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "suppliers")
/**
 * A supplier
 */
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
