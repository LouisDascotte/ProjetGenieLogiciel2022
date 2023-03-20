package com.pgl.energenius.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pgl.energenius.enums.ClientStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "clients")

/**
 * Client
 */
public class Client {
    /**
     * The ID of the client
     */
    @Id
    private ObjectId id;

    /**
     * The first name of the client
     */
    private String firstName;
    /**
     * The last name of the client
     */
    private String lastName;
    /**
     * The phone number of the client
     */
    private String phoneNo;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date lastAccess; // à quoi ça sert ? TODO

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date creationDate; // pareil TODO

    /**
     * The address of the client
     */
    private Address address;
    /**
     * The status of the client
     */
    private ClientStatus status;

    /**
     * The language that the client usually uses
     */
    @DBRef(lazy = true)
    private Language language; // enum ou ref vers table language ? TODO

    /**
     * The favorite portfolio of the client
     */
    @DBRef(lazy = true)
    private Portfolio favoritePortfolio;

    /**
     * If the client prefers to use the dark mode of the application or not
     */
    private Boolean darkMode;

    /**
     * The list of the notifications of the client
     */
    private List<Notification> notifications;

    /**
     * Create a client
     * @param firstName
     * @param lastName
     * @param phoneNo
     * @param address
     * @param language
     */
    public Client(String firstName, String lastName, String phoneNo, Address address, Language language) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.address = address;
        this.language = language;
        id = new ObjectId();
        creationDate = new Date(System.currentTimeMillis());
        lastAccess = creationDate;
        status = null; // TODO
        favoritePortfolio = null; // TODO
        darkMode = false;
        notifications = new ArrayList<>();
    }
//
//
//    public Client(String firstName, String lastName, String email, String phoneNumber, String address, String city, String country, String postalCode, String language){
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.phoneNumber = phoneNumber;
//        this.address = address;
//        this.language = language;
//        this.email = email;
//        this.country = country;
//        this.city = city;
//        this.postalCode = postalCode;
//        this.id = new ObjectId();
//    }
}
