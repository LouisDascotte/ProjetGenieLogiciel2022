package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Meter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeterRepository extends MongoRepository<Meter, String> {

    List<Meter> findByClientId(ObjectId clientId);

    List<Meter> findBySupplierId(ObjectId supplierId);
}
