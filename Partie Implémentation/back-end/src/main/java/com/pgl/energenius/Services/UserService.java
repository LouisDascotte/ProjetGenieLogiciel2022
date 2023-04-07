package com.pgl.energenius.Services;

import com.pgl.energenius.Exception.ObjectNotValidatedException;
import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Objects.User;
import com.pgl.energenius.Objects.notifications.Notification;
import com.pgl.energenius.Repositories.UserRepository;
import com.pgl.energenius.Utils.ValidationUtils;
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
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ValidationUtils validationUtils;

    public User insertUser(User user) throws ObjectNotValidatedException {

        validationUtils.validate(user);
        return userRepository.insert(user);
    }

    public void saveUser(User user) throws ObjectNotValidatedException {

        validationUtils.validate(user);
        userRepository.save(user);
    }

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
