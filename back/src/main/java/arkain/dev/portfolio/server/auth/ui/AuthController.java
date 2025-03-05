package arkain.dev.portfolio.server.auth.ui;

import arkain.dev.portfolio.server.auth.app.AuthService;
import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.common.dto.ResponseDto;
import jakarta.servlet.http.HttpSession;
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
    public ResponseDto<CommonSuccess> login(@RequestBody LoginDto dto, HttpSession session) {
        return ResponseDto.ok(authService.login(dto, session));
    }
}
