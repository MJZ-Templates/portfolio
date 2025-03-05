package arkain.dev.portfolio.server.auth.app;

import arkain.dev.portfolio.server.auth.domain.Member;
import arkain.dev.portfolio.server.auth.ui.LoginDto;
import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberService memberService;

    public CommonSuccess login(LoginDto dto, HttpSession session) {
        Member member = memberService.findMember(dto.username());
        member.validate(dto.username(), dto.password());

        setSecurityContext(dto);
        session.setAttribute("user", dto.username());

        return new CommonSuccess(true);
    }

    private static void setSecurityContext(LoginDto dto) {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(dto.username(), null, null));
        SecurityContextHolder.setContext(securityContext);

    }
}
