package com.pgl.energenius.repository;

import com.pgl.energenius.model.MeterAllocation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MeterAllocationRepository extends MongoRepository<MeterAllocation, ObjectId> {

    List<MeterAllocation> findByClientId(ObjectId clientId);

    List<MeterAllocation> findByClientIdAndEAN(ObjectId clientId, String EAN);

    List<MeterAllocation> findBySupplierNameAndEAN(String supplierName, String EAN);

    @Query("{'beginDate': {$lte: ?0}, 'endDate': {$gte: ?0}, 'EAN': ?1}")
    MeterAllocation findByDateAndEAN(String date, String EAN);

    List<MeterAllocation> findByEndDate(String endDate);
}
