package com.pgl.energenius.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Utility class for JSON Web Token (JWT) generation and validation.
 */
@Component
public class JwtUtil implements Serializable {

    @Serial
    private static final long serialVersionUID = -2428942894298L;

    public static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60; // Ex: On reste connecté pendant 24h.

    @Value("${jwt.secret}")
    private String secret;

    /**
     * Returns the email address contained in the specified JWT token.
     *
     * @param token the JWT token
     * @return the email address contained in the token
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Returns the date when the specified JWT token was issued.
     *
     * @param token the JWT token
     * @return the date when the token was issued
     */
    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    /**
     * Returns the expiration date of the specified JWT token.
     *
     * @param token the JWT token
     * @return the expiration date of the token
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * Returns the claim specified by the given resolver function from the
     * specified JWT token.
     *
     * @param token the JWT token
     * @param claimsResolver the function used to retrieve the desired claim
     * @param <T> the type of the claim
     * @return the claim specified by the resolver function
     */
    public  <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(getAllClaimsFromToken(token));
    }

    /**
     * Returns all the claims contained in the specified JWT token.
     *
     * @param token the JWT token
     * @return all the claims contained in the token
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Returns whether the specified JWT token has expired.
     *
     * @param token the JWT token
     * @return true if the token has expired, false otherwise
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Generates a new JWT token for the specified user details.
     *
     * @param userDetails the user details
     * @return the new JWT token
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    /**
     * Generates a new JWT token for the specified claims and subject.
     *
     * @param claims the claims to include in the token
     * @param subject the subject of the token
     * @return the new JWT token
     */
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS512).compact();
    }

    /**
     * Validates a JWT token for a given user.
     *
     * @param token the JWT token to validate
     * @param userDetails the user details to validate the token
     * @return true if the token is valid for the given user, false otherwise
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final  String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}