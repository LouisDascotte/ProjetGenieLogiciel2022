package com.pgl.energenius.exception;

/**
 * Exception thrown when two addresses are expected to be equal, but are not.
 */
public class AddressesNotEqualsException extends Exception {

    public AddressesNotEqualsException(String message) {
        super(message);
    }
}
