package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
//@Document(collection = "addresses")
public class Address {

//    @Id
//    private ObjectId id;

    private String city;
    private String street;
    private int houseNo;
    private int box;
    private int postalCode;
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
