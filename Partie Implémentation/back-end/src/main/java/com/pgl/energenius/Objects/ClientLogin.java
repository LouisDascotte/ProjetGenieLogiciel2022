package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * The login information of a client
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientLogin extends User {

    /**
     * The email used by the client
     */
    @Indexed(unique = true, sparse = true)
    private String email;

    /**
     * The client that uses the information
     */
    @DBRef
    private Client client;

    public ClientLogin(String email, String password, Client client) {
        super(password);
        this.email = email;
        this.client = client;
    }

    /**
     * Grant authorities to the client
     * @return the roles of the client
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add((GrantedAuthority) () -> "ROLE_CLIENT");
        return roles;
    }

    /**
     * Get the email
     * @return the email
     */
    @Override
    public String getUsername() {
        return email;
    }
}
