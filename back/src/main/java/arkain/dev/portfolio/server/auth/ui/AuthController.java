package arkain.dev.portfolio.server.auth.ui;

import arkain.dev.portfolio.server.auth.app.AuthService;
import arkain.dev.portfolio.server.auth.app.dto.TokenDto;
import arkain.dev.portfolio.server.common.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseDto<TokenDto> login(@RequestBody LoginDto dto) {
        return ResponseDto.ok(authService.login(dto));
    }
}
