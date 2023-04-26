package com.pgl.energenius.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.Address;
import com.pgl.energenius.model.Area;
import com.pgl.energenius.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * Service class for managing addresses
 */
@Service
public class AddressService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private AddressRepository addressRepository;

    /**
     * Get the address from the database.
     *
     * @param addressStr the address string to search for
     * @return the Address object if found
     */
    public Address getAddress(String addressStr) throws ObjectNotFoundException {

        return addressRepository.findById(addressStr)
                .orElseThrow(() -> new ObjectNotFoundException("Address not found with address: " + addressStr));
    }

    /**
     * Create an address in the database.
     *
     * @param addressStr the address string of the new address
     * @return The new address
     */
    public Address createAddress(String addressStr) throws IOException, InterruptedException, ApiException, ObjectNotFoundException {

        GeoApiContext context = new GeoApiContext.Builder().apiKey("AIzaSyC19i2Ez-JUS1BkuA0BjUcY0rPk0uQzBBc").build();
        GeocodingResult[] results = GeocodingApi.geocode(context, addressStr).await();

        if (results.length != 1) {
            throw new ObjectNotFoundException("Could not found a single address with: " + addressStr);
        }

        String formattedAddress = results[0].formattedAddress;
        double latitude = results[0].geometry.location.lat;
        double longitude = results[0].geometry.location.lng;

        Address address = new Address(formattedAddress, latitude, longitude);

        try {
            addressRepository.insert(address);

        } catch (DuplicateKeyException ignored) {}

        return address;
    }

    /**
     * Get the formatted address from Google api.
     *
     * @param addressStr the address string
     * @return The formatted address
     */
    public String getFormattedAddress(String addressStr) throws IOException, InterruptedException, ApiException, ObjectNotFoundException {

        GeoApiContext context = new GeoApiContext.Builder().apiKey("AIzaSyC19i2Ez-JUS1BkuA0BjUcY0rPk0uQzBBc").build();
        GeocodingResult[] results = GeocodingApi.geocode(context, addressStr).await();

        if (results.length != 1) {
            throw new ObjectNotFoundException("Could not found a single address with: " + addressStr);
        }

        return results[0].formattedAddress;
    }

    /**
     * To check if an address is in one the areas.
     *
     * @param address the address
     * @param areaNames the names of areas
     * @return true, if the address is in one of the areas. False, otherwise.
     */
    public Boolean isAddressInOneOfAreas(List<String> areaNames, Address address) {

        GeoJsonPoint point = new GeoJsonPoint(new Point(address.getLng(), address.getLat()));
        Query query = new Query().addCriteria(Criteria.where("name").in(areaNames));
        query.addCriteria(Criteria.where("polygons").intersects(point));
        query.fields().include("name");
        List<Area> areas = mongoTemplate.find(query, Area.class);

        return !areas.isEmpty();
    }
}
