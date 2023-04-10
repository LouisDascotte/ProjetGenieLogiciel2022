package com.pgl.energenius.model;

import com.pgl.energenius.model.dto.ClientDto;
import com.pgl.energenius.enums.ClientStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

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
    @Default
    private ObjectId id = new ObjectId();

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

    @Default
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date lastAccess = new Date();

    @Default
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date creationDate = new Date();

    /**
     * The address of the client
     */
    private String address;
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
    @Default
    private Boolean darkMode = false;

    public static ClientBuilder builder(ClientDto clientDto) {

        return builder()
                .firstName(clientDto.getFirstName())
                .lastName(clientDto.getLastName())
                .phoneNo(clientDto.getPhoneNumber())
                .address(clientDto.getAddress())
                .language(clientDto.getLanguage());
    }

    public static ClientBuilder builder() {
        return new ClientBuilder();
    }
}
