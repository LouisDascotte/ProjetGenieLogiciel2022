package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Repositories.ClientLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * This class provides services related to ClientLoginRepository.
 */
@Service
public class ClientLoginService implements UserDetailsService {

    @Autowired
    private ClientLoginRepository clientLoginRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<ClientLogin> clientLoginOpt = clientLoginRepository.findByEmail(email);
        return clientLoginOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }
}
