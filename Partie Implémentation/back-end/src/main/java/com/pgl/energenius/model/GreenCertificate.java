package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "green_certificates")
public class GreenCertificate {

    @Id
    private ObjectId id;

    private ObjectId portfolioId;

    @Indexed(unique = true)
    private String date;

    private Status status;

    public enum Status {
        ACCEPTED,
        PENDING,
        REJECTED
    }

    public GreenCertificate(ObjectId portfolioId, String date, Status status) {
        this.portfolioId = portfolioId;
        this.date = date;
        this.status = status;
        id = new ObjectId();
    }
}
