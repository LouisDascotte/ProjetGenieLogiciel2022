package com.pgl.energenius.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.mongodb.DuplicateKeyException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.Address;
import com.pgl.energenius.model.Area;
import com.pgl.energenius.repository.AddressRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private AddressRepository addressRepository;

    public Address getAddress(String addressStr) throws ObjectNotFoundException {

        return addressRepository.findById(addressStr)
                .orElseThrow(() -> new ObjectNotFoundException("Address not found with address: " + addressStr));
    }

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

    public String getFormattedAddress(String addressStr) throws IOException, InterruptedException, ApiException, ObjectNotFoundException {

        GeoApiContext context = new GeoApiContext.Builder().apiKey("AIzaSyC19i2Ez-JUS1BkuA0BjUcY0rPk0uQzBBc").build();
        GeocodingResult[] results = GeocodingApi.geocode(context, addressStr).await();

        if (results.length != 1) {
            throw new ObjectNotFoundException("Could not found a single address with: " + addressStr);
        }

        return results[0].formattedAddress;
    }

    public Boolean isAddressInArea(ObjectId areaId, Address address) {

        GeoJsonPoint point = new GeoJsonPoint(new Point(address.getLng(), address.getLat()));
        Query query = new Query().addCriteria(Criteria.where("_id").is(areaId));
        query.addCriteria(Criteria.where("polygons").intersects(point));
        query.fields().include("_id");
        List<Area> areas = mongoTemplate.find(query, Area.class);

        return !areas.isEmpty();
    }
}
