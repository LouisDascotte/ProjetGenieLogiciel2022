package com.pgl.energenius.repository;

import com.pgl.energenius.model.Client;
import com.pgl.energenius.model.Contract;
import com.pgl.energenius.model.Supplier;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends MongoRepository<Contract, ObjectId> {

    List<Contract> findByClient(Client client);

    List<Contract> findBySupplier(Supplier supplier);
}
