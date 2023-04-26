package com.pgl.energenius.exception;

/**
 * Exception thrown when an object already exists in the database.
 */
public class ObjectAlreadyExistsException extends Exception {

    public ObjectAlreadyExistsException(String message) {
        super(message);
    }
}
