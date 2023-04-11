package com.pgl.energenius.service;

import com.pgl.energenius.Exception.InvalidUserDetailsException;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.EmployeeLogin;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

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
