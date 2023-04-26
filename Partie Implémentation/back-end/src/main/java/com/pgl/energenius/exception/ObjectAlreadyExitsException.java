package com.pgl.energenius.exception;

/**
 * Exception thrown when an object already exists in the database.
 */
public class ObjectAlreadyExitsException extends Exception {

    public ObjectAlreadyExitsException(String message) {
        super(message);
    }
}
