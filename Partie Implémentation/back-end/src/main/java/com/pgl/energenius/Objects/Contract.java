package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;

@Data
@AllArgsConstructor
@Document(collection = "contracts")
public class Contract {

    @Id
    private ObjectId id;

    private Date beginDate;
    private Date endDate;

    @DBRef(lazy = true)
    private Client client;

    @DBRef(lazy = true)
    private Supplier supplier;

    private String contractType;

    @DBRef(lazy = true)
    private Meter meter1;

    @DBRef(lazy = true)
    private Meter meter2;

    @DBRef(lazy = true)
    private Offer offer;

    private String status; // TODO enum ?

    @DBRef(lazy = true)
    private Portfolio portfolio;

    public Contract(Date beginDate, Date endDate, Client client, Supplier supplier, String contractType, Meter meter1, Meter meter2, Offer offer, String status, Portfolio portfolio) {
        id = new ObjectId();
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.client = client;
        this.supplier = supplier;
        this.contractType = contractType;
        this.meter1 = meter1;
        this.meter2 = meter2;
        this.offer = offer;
        this.status = status;
        this.portfolio = portfolio;
    }
}
