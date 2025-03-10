package arkain.dev.portfolio.server.config.security.jwt;

import arkain.dev.portfolio.server.common.exception.CommonException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.List;

import static arkain.dev.portfolio.server.common.exception.ErrorCode.*;


@Component
@RequiredArgsConstructor
public class JwtProvider implements AuthenticationProvider {

    private final UserDetailsService userDetailsService;

    private static SecretKey key;

    @Value("${spring.security.secret}")
    private String secret;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        try {
            String token = (String) authentication.getPrincipal();

            Jws<Claims> parsedToken = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

            Claims claims = parsedToken.getPayload();
            String userId = claims.getSubject();

            UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

            return new UsernamePasswordAuthenticationToken(userDetails, null,
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
        } catch (ExpiredJwtException e) {
            throw new CommonException(EXPIRED_TOKEN_ERROR);
        } catch (JwtException e) {
            throw new CommonException(INVALID_TOKEN_ERROR);
        } catch (IllegalArgumentException e) {
            throw new CommonException(TOKEN_UNSUPPORTED_ERROR);
        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.isAssignableFrom(UsernamePasswordAuthenticationToken.class);
    }
}
