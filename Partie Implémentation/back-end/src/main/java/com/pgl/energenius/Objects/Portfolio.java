package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * The portfolio of a client
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "portfolios")
public class Portfolio {

    /**
     * The ID of the portfolio
     */
    @Id
    private ObjectId id;

    /**
     * The client that owns the portfolio
     */
    @DBRef(lazy = true)
    private Client client;

    /**
     * The address of the client that owns the portfolio
     */
    private Address address;
    /**
     * The name of the portfolio
     */
    private String name;

    /**
     * The list of the supply points that are in the portfolio
     */
    private List<SupplyPoint> supplyPoints;

    /**
     * Create a portfolio
     * @param client
     * @param address
     * @param name
     */
    public Portfolio(Client client, Address address, String name) {
        id = new ObjectId();
        this.client = client;
        this.address = address;
        this.name = name;
        supplyPoints = new ArrayList<>();
    }
}
