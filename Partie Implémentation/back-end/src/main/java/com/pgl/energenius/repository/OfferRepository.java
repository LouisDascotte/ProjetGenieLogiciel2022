package com.pgl.energenius.repository;

import com.pgl.energenius.enums.EnergyType;
import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.model.offer.GazElecOffer;
import com.pgl.energenius.model.offer.Offer;
import com.pgl.energenius.model.offer.SimpleOffer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends MongoRepository<Offer, ObjectId> {

    List<SimpleOffer> findByHourTypeAndEnergyType(HourType hourType, EnergyType energyType);

    List<GazElecOffer> findByHourType(HourType hourType);
}
