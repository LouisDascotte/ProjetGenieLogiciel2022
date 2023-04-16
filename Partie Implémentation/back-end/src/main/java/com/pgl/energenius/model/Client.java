package com.pgl.energenius.model;

import com.pgl.energenius.model.dto.ClientDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

    /**
     * The address of the client
     */
    private String address;
    /**
     * The status of the client
     */
    private Status status;

    /**
     * The language that the client usually uses
     */
    private String language;

    /**
     * The id of the favorite portfolio of the client
     */
    private ObjectId favoritePortfolioId;

    /**
     * If the client prefers to use the dark mode of the application or not
     */
    @Default
    private Boolean darkMode = false;

    public enum Status {
        // TODO
    }
}
