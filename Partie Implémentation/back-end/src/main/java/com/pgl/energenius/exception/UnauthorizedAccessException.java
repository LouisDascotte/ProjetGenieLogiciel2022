package com.pgl.energenius.exception;

/**
 * Exception thrown the authenticated user cannot access the object.
 */
public class UnauthorizedAccessException extends Exception {

    public UnauthorizedAccessException(String message) {
        super(message);
    }
}
