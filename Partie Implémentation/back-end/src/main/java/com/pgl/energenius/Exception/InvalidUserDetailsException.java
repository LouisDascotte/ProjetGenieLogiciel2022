package com.pgl.energenius.Exception;

public class InvalidUserDetailsException extends Exception {

    public InvalidUserDetailsException() {
        super("The principal object is not an instance of UserDetails");
    }
}
