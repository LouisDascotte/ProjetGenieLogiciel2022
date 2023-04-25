package com.pgl.energenius.repository;

import com.pgl.energenius.model.GreenCertificate;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GreenCertificateRepository extends MongoRepository<GreenCertificate, ObjectId> {

    Optional<GreenCertificate> findByPortfolioIdAndStatus(ObjectId portfolioId, GreenCertificate.Status status);

    List<GreenCertificate> findByPortfolioId(ObjectId portfolioId);
}
