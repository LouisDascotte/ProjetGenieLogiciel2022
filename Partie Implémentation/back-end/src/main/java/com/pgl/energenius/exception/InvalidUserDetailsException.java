package com.pgl.energenius.exception;

/**
 * Exception thrown when the principal object is not an instance of UserDetails.
 */
public class InvalidUserDetailsException extends Exception {

    public InvalidUserDetailsException() {
        super("The principal object is not an instance of UserDetails");
    }
}
