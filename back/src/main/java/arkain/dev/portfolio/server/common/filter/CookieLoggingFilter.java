package arkain.dev.portfolio.server.common.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Slf4j
@Component
public class CookieLoggingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // 요청 쿠키 로그 출력
        if (httpRequest.getCookies() != null) {
            Arrays.stream(httpRequest.getCookies())
                    .forEach(cookie -> log.info("[Request Cookie] {} = {}", cookie.getName(), cookie.getValue()));
        } else {
            log.info("[Request Cookie] No cookies found");
        }

        // 필터 체인 실행
        chain.doFilter(request, response);

        // 응답 쿠키 로그 출력
        Optional.ofNullable(httpResponse.getHeader("Set-Cookie"))
                .ifPresent(cookie -> log.info("[Response Cookie] {}", cookie));
    }
}
