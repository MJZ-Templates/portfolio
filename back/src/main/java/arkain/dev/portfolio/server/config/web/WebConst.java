package arkain.dev.portfolio.server.config.web;

import java.util.List;

public class WebConst {

    public static final List<String> ALLOWED_HTTP_METHODS = List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS");
    public static final List<String> ALLOWED_HTTP_HEADERS = List.of("*");
    public static final List<String> ALLOWED_ORIGINS = List.of("http://localhost:3000", "http://localhost:5173", "https://portfolio-client.dev-k8s.arkain.io");

    private WebConst() {
    }
}
