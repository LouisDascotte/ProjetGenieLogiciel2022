package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "suppliers")
public class Supplier {

    @Id
    private ObjectId id;

    private String name;
    private String operatingRegion; // TODO

    public Supplier(String name, String operatingRegion) {
        id = new ObjectId();
        this.name = name;
        this.operatingRegion = operatingRegion;
    }
}
