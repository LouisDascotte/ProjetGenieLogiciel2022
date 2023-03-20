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
@Document(collection = "portfolios")
public class Portfolio {

    @Id
    private ObjectId id;

    @DBRef(lazy = true)
    private Client client_;

    private Address address_;
    private String name;
    private List<SupplyPoint> supplyPoints;

    private String address; // added for tests
    @DBRef(lazy = true)
    private String client; 


    public Portfolio(Client client, Address address, String name) {
        id = new ObjectId();
        this.client_ = client;
        this.address_ = address;
        this.name = name;
        supplyPoints = new ArrayList<>();
    }

    public Portfolio(String client, String address, String name){
        id = new ObjectId();
        this.client = client; 
        this.address = address; 
        this.name = name; 
    }
}
