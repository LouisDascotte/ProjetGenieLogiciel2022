package com.pgl.energenius.utils;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityUtils {

    public ClientLogin getCurrentClientLogin() throws InvalidUserDetailsException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!(principal instanceof ClientLogin)) {
            throw new InvalidUserDetailsException();
        }

        return (ClientLogin) principal;
    }

    public SupplierLogin getCurrentSupplierLogin() throws InvalidUserDetailsException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!(principal instanceof SupplierLogin)) {
            throw new InvalidUserDetailsException();
        }

        return (SupplierLogin) principal;
    }
}
