package com.pgl.energenius.Objects;

import com.pgl.energenius.Objects.DTOs.ClientDto;
import com.pgl.energenius.enums.ClientStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
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

/**
 * Client
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "clients")
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
    private Date lastAccess;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date creationDate;

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
    private String language;

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
     * @param clientDto
     */
    public Client(ClientDto clientDto) {
        this.firstName = clientDto.getFirstName();
        this.lastName = clientDto.getLastName();
        this.phoneNo = clientDto.getPhoneNumber();
        this.address = clientDto.getAddress();
        this.language = clientDto.getLanguage();
        id = new ObjectId();
        creationDate = new Date(System.currentTimeMillis());
        lastAccess = creationDate;
        status = null; // TODO
        favoritePortfolio = null;
        darkMode = false;
        notifications = new ArrayList<>();
    }
}
