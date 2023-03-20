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
public class Employee {

    @Id
    private ObjectId id;

    @DBRef(lazy = true)
    private Language language;

    @DBRef(lazy = true)
    private Supplier supplier;

    private List<Notification> notifications;
    private List<MeterAllocation> meterAllocationHistory;

    public Employee(Language language, Supplier supplier) {
        id = new ObjectId();
        this.language = language;
        this.supplier = supplier;
        notifications = new ArrayList<>();
        meterAllocationHistory = new ArrayList<>();
    }
}
