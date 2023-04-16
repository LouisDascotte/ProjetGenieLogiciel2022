package com.pgl.energenius.repository;

import com.pgl.energenius.model.reading.Reading;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingRepository extends MongoRepository<Reading, ObjectId> {

    Reading findByEANAndDate(String EAN, String date);

    @Query("{'date': {$gte: ?0, $lte: ?1}, 'EAN': ?2}")
    List<Reading> findByDateBetweenAndEAN(String beginDate, String endDate, String EAN);
}
