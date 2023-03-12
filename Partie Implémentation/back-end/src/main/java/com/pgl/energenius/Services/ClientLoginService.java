package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Repositories.ClientLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ClientLoginService implements UserDetailsService {

    @Autowired
    private ClientLoginRepository clientLoginRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ClientLogin clientLogin = clientLoginRepository.findByEmail(email);

        if (clientLogin == null)
            throw new UsernameNotFoundException("No client found with email address : " + email);
        return clientLogin;
    }
}
