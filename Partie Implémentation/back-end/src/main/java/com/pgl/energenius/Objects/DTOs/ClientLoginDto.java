package com.pgl.energenius.Objects.DTOs;

import lombok.Data;

@Data
/**
 * Client Login
 */
public class ClientLoginDto {

    /**
     * The email used by the client
     */
    private String email;

    /**
     * The password used by the client
     */
    private String password;
}
