package com.pgl.energenius.service;

import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.Address;
import com.pgl.energenius.model.Area;
import com.pgl.energenius.repository.AddressRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class AddressServiceTest {

    @InjectMocks
    private AddressService addressService;

    @Mock
    private MongoTemplate mongoTemplate;

    @Mock
    private AddressRepository addressRepository;

    @Test
    public void test_getAddress() throws ObjectNotFoundException {

        Address address = new Address("test", 0d, 0d);

        when(addressRepository.findById("test")).thenReturn(Optional.of(address));
        assertEquals(address, addressService.getAddress("test"));
    }

    @Test
    public void test_getAddress_ObjectNotFound() {

        when(addressRepository.findById("test")).thenReturn(Optional.empty());
        assertThrows(ObjectNotFoundException.class, () -> addressService.getAddress("test"));
    }

    @Test
    public void test_isAddressInOneOfAreas_True() {

        Address address = new Address("Test", 0d, 0d);
        String areaName = "Test";

        GeoJsonPoint point = new GeoJsonPoint(new Point(address.getLng(), address.getLat()));
        Query query = new Query().addCriteria(Criteria.where("name").in(List.of(areaName)));
        query.addCriteria(Criteria.where("polygons").intersects(point));
        query.fields().include("name");

        when(mongoTemplate.find(query, Area.class)).thenReturn(List.of(new Area()));
        assertTrue(addressService.isAddressInOneOfAreas(List.of(areaName), address));
    }

    @Test
    public void test_isAddressInOneOfAreas_False() {

        Address address = new Address("Test", 0d, 0d);
        String areaName = "Test";

        GeoJsonPoint point = new GeoJsonPoint(new Point(address.getLng(), address.getLat()));
        Query query = new Query().addCriteria(Criteria.where("name").in(List.of(areaName)));
        query.addCriteria(Criteria.where("polygons").intersects(point));
        query.fields().include("name");

        when(mongoTemplate.find(query, Area.class)).thenReturn(new ArrayList<>());
        assertFalse(addressService.isAddressInOneOfAreas(List.of(areaName), address));
    }
}
