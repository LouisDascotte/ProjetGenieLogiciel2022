package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Meter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeterRepository extends MongoRepository<Meter, String> {
}
