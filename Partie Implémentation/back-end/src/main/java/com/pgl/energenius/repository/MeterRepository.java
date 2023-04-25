package com.pgl.energenius.repository;

import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.model.Meter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeterRepository extends MongoRepository<Meter, String> {

    List<Meter> findByClientId(ObjectId clientId);

    List<Meter> findBySupplierId(ObjectId supplierId);

    List<String> findIdsByClientId(ObjectId clientId);

    List<String> findIdsByClientIdAndSupplierId(ObjectId clientId, ObjectId supplierId);

    List<Meter> findByMeterType(MeterType meterType);
}
