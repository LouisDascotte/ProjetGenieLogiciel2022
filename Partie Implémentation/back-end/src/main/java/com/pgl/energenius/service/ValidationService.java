package com.pgl.energenius.service;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgl.energenius.exception.ObjectNotValidatedException;

import java.util.Set;

@Service
public class ValidationService {

    @Autowired
    private Validator validator;

    public void validate(Object object) throws ObjectNotValidatedException {

        Set<ConstraintViolation<Object>> violations = validator.validate(object);

        if (!violations.isEmpty()) {
            throw new ObjectNotValidatedException("Object not validated error");
        }
    }
}
