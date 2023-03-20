package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
//@Document(collection = "addresses")
/**
 * The address of an client
 */
public class Address {

//    @Id
//    private ObjectId id;
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

//    public Address(String city, String street, int houseNo, int box, int postalCode, String country) {
//        id = new ObjectId();
//        this.city = city;
//        this.street = street;
//        this.houseNo = houseNo;
//        this.box = box;
//        this.postalCode = postalCode;
//        this.country = country;
//    }
}
