package com.pgl.energenius.exception;

/**
 * Exception thrown when the input of the client is not correct.
 */
public class BadRequestException extends Exception {

    public BadRequestException(String message) {
        super(message);
    }
}
