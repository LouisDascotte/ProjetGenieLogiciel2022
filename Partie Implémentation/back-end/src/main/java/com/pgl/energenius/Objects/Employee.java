package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "employees")
/**
 * Employee of a supplier
 */
public class Employee {

    /**
     * The ID of the employee
     */
    @Id
    private ObjectId id;

    /**
     * The prefered language of the employee
     */
    @DBRef(lazy = true)
    private Language language;

    /**
     * The supplier that the employee works for
     */
    @DBRef(lazy = true)
    private Supplier supplier;

    /**
     * The notifications of the employee
     */
    private List<Notification> notifications;
    /**
     * The history of the meters allocated by the employee
     */
    private List<MeterAllocation> meterAllocationHistory;

    /**
     * Create an employee
     * @param language
     * @param supplier
     */
    public Employee(Language language, Supplier supplier) {
        id = new ObjectId();
        this.language = language;
        this.supplier = supplier;
        notifications = new ArrayList<>();
        meterAllocationHistory = new ArrayList<>();
    }
}
