package com.pgl.energenius.config;

import com.pgl.energenius.Objects.ClientLogin;
import com.pgl.energenius.Repositories.ClientLoginRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.util.StringUtils.hasText;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private ClientLoginRepository clientLoginRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (!hasText(header) || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Get jwt token
        final String token = header.split(" ")[1].trim();

        // Get clientLogin (UserDetails) and set it on the spring security context
        ClientLogin clientLogin = clientLoginRepository.findByEmail(jwtUtil.getEmailFromToken(token)).orElse(null);

        // Validate token
        if (clientLogin == null || !jwtUtil.validateToken(token, clientLogin)) {
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                clientLogin, null, clientLogin.getAuthorities());

        // Authenticate the user
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}
