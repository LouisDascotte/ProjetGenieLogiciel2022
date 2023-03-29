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
 * The login information of an employee
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class EmployeeLogin extends User {


    /**
     * The ID of the employee
     */
    @Indexed(unique = true, sparse = true)
    private String loginId;

    /**
     * The employee that owns those login infos
     */
    @DBRef
    private Employee employee;

    public EmployeeLogin(String loginId, String password, Employee employee) {
        super(password);
        this.loginId = loginId;
        this.employee = employee;
    }

    /**
     * Grant authorities to the employee
     * @return the roles of the employee
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add((GrantedAuthority) () -> "ROLE_EMPLOYEE");
        return roles;
    }

    @Override
    public String getUsername() {
        return loginId;
    }
}
