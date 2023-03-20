package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * The address of a client
 */
@Data
@AllArgsConstructor
public class Address {

    /**
     * The city of the client
     */
    private String city;

    /**
     * The street of the client
     */
    private String street;

    /**
     * The number of the client's house
     */
    private int houseNo;

    /**
     * The postal box of the client
     */
    private int box;

    /**
     * The postal code of the client's city
     */
    private int postalCode;

    /**
     * The country of the client
     */
    private String country;
}
