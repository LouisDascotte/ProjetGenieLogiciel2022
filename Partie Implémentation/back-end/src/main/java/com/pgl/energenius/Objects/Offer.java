package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.ContractType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.enums.OfferType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "offers")
public class Offer {

    @Id
    private ObjectId id;

    private OfferType offerType;
    private MeterType meterType;
    private int contractLength;
    private int cost;
    private ContractType contractType;
    // Ajouter une zone ou l'offre est accessible ? TODO

    @DBRef(lazy = true)
    private Supplier supplier;

    public Offer(OfferType offerType, MeterType meterType, int contractLength, int cost, ContractType contractType, Supplier supplier) {
        id = new ObjectId();
        this.offerType = offerType;
        this.meterType = meterType;
        this.contractLength = contractLength;
        this.cost = cost;
        this.contractType = contractType;
        this.supplier = supplier;
    }
}
