package arkain.dev.portfolio.server.config.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.util.StringUtils.hasText;

@Slf4j
@Component
public class JwtProcessingFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    public JwtProcessingFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        log.info("[JwtProcessingFilter] doFilterInternal");
        String token = getToken(request);
        setAuthentication(token);
        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String token) {
        if (hasText(token)) {
            UsernamePasswordAuthenticationToken unAuthorization = new UsernamePasswordAuthenticationToken(
                token, "");
            log.info("[JwtProcessingFilter] try to authenticate");
            Authentication authentication = jwtProvider.authenticate(unAuthorization);
            SecurityContextHolder.getContextHolderStrategy().getContext().setAuthentication(authentication);
            log.info("[JwtProcessingFilter] authenticated");
        }
    }

    private static String getToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            log.info("[JwtProcessingFilter] getToken");
            return bearerToken.substring(7);
        }
        return null;
    }
}
