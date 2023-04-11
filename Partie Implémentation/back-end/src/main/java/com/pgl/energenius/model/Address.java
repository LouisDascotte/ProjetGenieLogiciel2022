package com.pgl.energenius.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * An address
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    /**
     * The city
     */
    private String city;

    /**
     * The street
     */
    private String street;

    /**
     * The number of house
     */
    private int houseNo;

    /**
     * The postal box
     */
    private int box;

    /**
     * The postal code
     */
    private int postalCode;

    /**
     * The country
     */
    private String country;
}