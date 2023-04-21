package com.pgl.energenius.model;

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
 * The login information of an employee
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class SupplierLogin extends User {


    /**
     * The ID of the employee
     */
    @Indexed(unique = true, sparse = true)
    private String loginId;

    /**
     * The employee that owns those login infos
     */
    @DBRef
    private Supplier supplier;

    public SupplierLogin(String loginId, String password, Supplier supplier) {
        super(password);
        this.loginId = loginId;
        this.supplier = supplier;
    }

    /**
     * Grant authorities to the employee
     * @return the roles of the employee
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add((GrantedAuthority) () -> "ROLE_SUPPLIER");
        return roles;
    }

    @Override
    public String getUsername() {
        return loginId;
    }
}
