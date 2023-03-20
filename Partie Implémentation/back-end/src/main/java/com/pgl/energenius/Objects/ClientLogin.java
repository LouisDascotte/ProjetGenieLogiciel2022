package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@Document("client_logins")

/**
 * The login informations of a client
 */
public class ClientLogin implements UserDetails {

    /**
     * The email used by the client
     */
    @Id
    private String email;

    /**
     * The password used by the client
     */
    private String password;

    /**
     * The client that uses the informations
     */
    @DBRef
    private Client client;

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

    /**
     * Check if the account isn't expired
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Check if the account isn't locked
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Check if the credential informations aren't expired
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Check if the account is enabled
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

}
