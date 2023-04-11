package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Employee of a supplier
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "employees")
public class Employee {

    /**
     * The ID of the employee
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

    /**
     * The preferred language of the employee
     */
    private String language;

    /**
     * The supplier that the employee works for
     */
    @Indexed(unique = true)
    @DBRef(lazy = true)
    private Supplier supplier;
}
