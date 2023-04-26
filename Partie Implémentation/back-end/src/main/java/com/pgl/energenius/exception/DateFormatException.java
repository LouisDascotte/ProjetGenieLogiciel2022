package com.pgl.energenius.exception;

/**
 * Exception thrown when a string is not equal to a date.
 */
public class DateFormatException extends Exception {

    public DateFormatException(String message) {
        super(message);
    }
}
