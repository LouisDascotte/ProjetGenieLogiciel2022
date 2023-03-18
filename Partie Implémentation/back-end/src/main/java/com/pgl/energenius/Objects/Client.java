package com.pgl.energenius.Objects;

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
public class Client {

    @Id
    private ObjectId id;

    private String firstName;
    private String lastName;
    private String phoneNo;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date lastAccess; // à quoi ça sert ? TODO

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date creationDate; // pareil TODO

    private Address address_;
    private ClientStatus status;

    @DBRef(lazy = true)
    private Language language_; // enum ou ref vers table language ? TODO

    @DBRef(lazy = true)
    private Portfolio favoritePortfolio;

    private Boolean darkMode;
    private List<Notification> notifications;

    
    // Ajouté par Godwill pour le test du register. Peut être modifié plus tard par Jerem 
    private String phoneNumber;
    private String email;
    private String address; 
    private String language;
    private String country;
    private String city;
    private String postalCode;
    private String password; 

    public Client(String firstName, String lastName, String phoneNo, Address address, Language language) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.address_ = address;
        this.language_ = language;
        id = new ObjectId();
        creationDate = new Date(System.currentTimeMillis());
        lastAccess = creationDate;
        status = null; // TODO
        favoritePortfolio = null; // TODO
        darkMode = false;
        notifications = new ArrayList<>();
    }


    public Client(String firstName, String lastName, String email, String phoneNumber, String address, String city, String country, String postalCode, String language){
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.phoneNumber = phoneNumber; 
        this.address = address; 
        this.language = language; 
        this.email = email; 
        this.country = country; 
        this.city = city; 
        this.postalCode = postalCode; 
        this.id = new ObjectId(); 
    }
}
