package com.pgl.energenius.Services;

import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * This class provides services related to User.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<ClientLogin> clientLoginOpt = userRepository.findByEmail(username);

        if (clientLoginOpt.isEmpty()) {
            return userRepository.findByLoginId(username).orElseThrow(
                    () -> new UsernameNotFoundException("Invalid credentials"));
        }

        return clientLoginOpt.get();
    }
}
