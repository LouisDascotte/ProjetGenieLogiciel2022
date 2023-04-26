package com.pgl.energenius.exception;

/**
 * Exception thrown when an object was not found in the database.
 */
public class ObjectNotFoundException extends Exception {

    public ObjectNotFoundException(String message) {
        super(message);
    }
}
