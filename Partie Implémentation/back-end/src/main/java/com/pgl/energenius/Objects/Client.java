package com.pgl.energenius.Objects;

import com.pgl.energenius.enums.ClientStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "clients")
public class Client {

    @Id
    private ObjectId id;

    private String firstName;
    private String lastName;
    private String phoneNo;
    private Date lastAccess; // à quoi ça sert ? TODO
    private Date creationDate; // pareil TODO
    private Address address;
    private ClientStatus status;

    @DBRef(lazy = true)
    private Language language; // enum ou ref vers table language ? TODO

    @DBRef(lazy = true)
    private Portfolio favoritePortfolio;

    private Boolean darkMode;
    private List<Notification> notifications;

    public Client(String firstName, String lastName, String phoneNo, Address address, Language language) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.address = address;
        this.language = language;
        id = new ObjectId();
        creationDate = Date.valueOf(LocalDate.now());
        lastAccess = creationDate;
        status = null; // TODO
        favoritePortfolio = null; // TODO
        darkMode = false;
        notifications = new ArrayList<>();
    }
}
