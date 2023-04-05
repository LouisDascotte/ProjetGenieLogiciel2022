package com.pgl.energenius.Utils;

import com.pgl.energenius.Exception.ObjectNotValidatedException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class ValidationUtils {

    @Autowired
    private Validator validator;

    public void validate(Object object) throws ObjectNotValidatedException {

        Set<ConstraintViolation<Object>> violations = validator.validate(object);

        if (!violations.isEmpty()) {
            throw new ObjectNotValidatedException("Object not validated error");
        }
    }
}
