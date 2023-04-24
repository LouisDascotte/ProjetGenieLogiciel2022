package com.pgl.energenius.repository;

import com.pgl.energenius.model.contract.Contract;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends MongoRepository<Contract, ObjectId> {

    List<Contract> findByClientId(ObjectId clientId);

    List<Contract> findBySupplierId(ObjectId supplierId);

    @Query("{$or:[{'EAN': ?0}, {'EAN_ELEC': ?0}, {'EAN_GAZ': ?0}]}")
    Optional<Contract> findByEAN(String EAN);

    boolean existsByClientIdAndSupplierId(ObjectId clientId, ObjectId supplierId);

    List<Contract> findByEndDate(String endDate);
}
