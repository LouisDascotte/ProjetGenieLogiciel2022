package com.pgl.energenius.config;

import com.pgl.energenius.model.User;
import com.pgl.energenius.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.util.StringUtils.hasText;

/**
 * This class represents a filter for validating and authorizing user requests using JWT authentication.
 * It extends the {@link OncePerRequestFilter} class and is annotated with {@link Component}.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (!hasText(header) || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Get jwt token
        final String token = header.split(" ")[1].trim();

        String username = jwtUtil.getUsernameFromToken(token);
        // Get clientLogin (UserDetails)
        User user = userRepository.findByEmail(username).orElse(null);

        if (user == null)
            user = userRepository.findByLoginId(username).orElse(null);

        // Validate token
        if (user == null || !jwtUtil.validateToken(token, user)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Set clientLogin (UserDetails) on the spring security context
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                user, null, user.getAuthorities());

        // Authenticate the user
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}
