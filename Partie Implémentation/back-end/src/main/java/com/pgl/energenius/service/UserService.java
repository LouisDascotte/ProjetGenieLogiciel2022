package com.pgl.energenius.service;

import com.pgl.energenius.model.ClientLogin;
import com.pgl.energenius.model.User;
import com.pgl.energenius.repository.UserRepository;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.config.WebSecurityConfig;
import com.pgl.energenius.utils.EmailUtils;
import com.pgl.energenius.utils.ValidationUtils;
import jakarta.mail.MessagingException;
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

    @Autowired
    private EmailUtils emailUtils;

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

    public Boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public void resetPasswordClient(String email, String token) throws MessagingException, ObjectNotFoundException {

        if (!existsByEmail(email))
            throw new ObjectNotFoundException("No client exists with email: " + email);

        emailUtils.sendPasswordResetMail(email, token);
    }

    public void changePasswordClient(String email, String newPassword) throws ObjectNotFoundException {

        ClientLogin clientLogin = userRepository.findByEmail(email)
                .orElseThrow(() -> new ObjectNotFoundException("No client exists with email: " + email));

        clientLogin.setPassword(WebSecurityConfig.passwordEncoder().encode(newPassword));
        userRepository.save(clientLogin);
    }
}
