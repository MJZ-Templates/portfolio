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

        String ip = httpRequest.getRemoteAddr();
        int port = httpRequest.getRemotePort();
        String method = httpRequest.getMethod();
        String uri = httpRequest.getRequestURI();

        log.info("[Request] IP: {}, Port: {}, Method: {}, URI: {}", ip, port, method, uri);
        chain.doFilter(request, response);
    }
}

