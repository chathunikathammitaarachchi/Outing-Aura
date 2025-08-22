

package com.example.OutingAura.repository;

import com.example.OutingAura.model.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends MongoRepository<Offer, String> {
}
