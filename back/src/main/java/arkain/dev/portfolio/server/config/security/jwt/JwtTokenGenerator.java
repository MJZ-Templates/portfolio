package arkain.dev.portfolio.server.config.security.jwt;

import arkain.dev.portfolio.server.config.security.domain.CustomUserDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenGenerator {

    private static SecretKey key;

    @Value("${spring.security.secret}")
    private String secret;

    @Value("${spring.security.token-validity-time}")
    private long validityTime;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String id = userDetails.getUsername();

        return Jwts.builder()
            .subject(id)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + validityTime))
            .signWith(key)
            .compact();
    }
}