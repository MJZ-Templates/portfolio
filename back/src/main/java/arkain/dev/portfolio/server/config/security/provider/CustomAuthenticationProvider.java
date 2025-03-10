package arkain.dev.portfolio.server.config.security.provider;


import arkain.dev.portfolio.server.common.exception.CommonException;
import arkain.dev.portfolio.server.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider {

    private final UserDetailsService userDetailsService;

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();

        UserDetails userDetails = userDetailsService.loadUserByUsername(name);
        validatePassword(password, userDetails);

        return new UsernamePasswordAuthenticationToken(userDetails, null);
    }

    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

    private void validatePassword(String password, UserDetails userDetails) {
        if (!password.equals(userDetails.getPassword())) {
            throw new CommonException(ErrorCode.FAILURE_LOGIN);
        }
    }

}
