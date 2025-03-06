package arkain.dev.portfolio.server.common.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Slf4j
@Component
public class RequestLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // 요청 IP 및 포트 추출
        String ip = httpRequest.getRemoteAddr(); // 클라이언트 IP
        int port = httpRequest.getRemotePort(); // 클라이언트 포트
        String method = httpRequest.getMethod(); // 요청 메서드 (GET, POST 등)
        String uri = httpRequest.getRequestURI(); // 요청 URI

        log.info("[Request] IP: {}, Port: {}, Method: {}, URI: {}", ip, port, method, uri);

        // 다음 필터 또는 컨트롤러로 요청 전달
        chain.doFilter(request, response);
    }
}

