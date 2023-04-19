package com.pgl.energenius.model.projection;

import org.bson.types.ObjectId;

public interface ClientProjection {

    ObjectId getId();

    String getFirstName();

    String getLastName();
}
