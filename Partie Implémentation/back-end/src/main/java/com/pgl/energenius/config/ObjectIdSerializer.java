package com.pgl.energenius.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

/**
 * This class is a custom Jackson serializer for converting ObjectIds to strings.
 */
public class ObjectIdSerializer extends JsonSerializer<ObjectId> {

    @Override
    public void serialize(ObjectId value, JsonGenerator gen, SerializerProvider serializers) throws IOException {

        if (value != null) {
            gen.writeString(value.toHexString());

        } else {
            gen.writeNull();
        }
    }
}
