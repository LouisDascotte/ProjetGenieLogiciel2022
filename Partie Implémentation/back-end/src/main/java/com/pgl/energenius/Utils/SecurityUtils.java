package com.pgl.energenius.Utils;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.EmployeeLogin;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public ClientLogin getCurrentClientLogin() throws InvalidUserDetailsException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!(principal instanceof ClientLogin)) {
            throw new InvalidUserDetailsException();
        }

        return (ClientLogin) principal;
    }

    public EmployeeLogin getCurrentEmployeeLogin() throws InvalidUserDetailsException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!(principal instanceof EmployeeLogin)) {
            throw new InvalidUserDetailsException();
        }

        return (EmployeeLogin) principal;
    }
}
