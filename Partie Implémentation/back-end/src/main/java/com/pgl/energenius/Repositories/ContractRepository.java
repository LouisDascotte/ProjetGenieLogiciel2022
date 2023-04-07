package com.pgl.energenius.Repositories;

import com.pgl.energenius.Objects.Client;
import com.pgl.energenius.Objects.Contract;
import com.pgl.energenius.Objects.Supplier;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends MongoRepository<Contract, ObjectId> {

    List<Contract> findByClient(Client client);

    List<Contract> findBySupplier(Supplier supplier);
}
