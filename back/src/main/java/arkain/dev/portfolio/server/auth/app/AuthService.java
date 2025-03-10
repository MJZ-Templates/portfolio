package arkain.dev.portfolio.server.auth.app;


import arkain.dev.portfolio.server.auth.app.dto.TokenDto;
import arkain.dev.portfolio.server.auth.ui.LoginDto;
import arkain.dev.portfolio.server.config.security.jwt.JwtTokenGenerator;
import arkain.dev.portfolio.server.config.security.provider.CustomAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final JwtTokenGenerator tokenGenerator;
    private final PasswordEncoder encoder;

    public TokenDto login(LoginDto dto) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(dto.username(), dto.password());
        Authentication token = customAuthenticationProvider.authenticate(authentication);
        String accessToken = tokenGenerator.generateToken(token);

        return new TokenDto("Bearer " + accessToken);
    }

    private String encode(String password) {
        return encoder.encode(password);
    }
}
