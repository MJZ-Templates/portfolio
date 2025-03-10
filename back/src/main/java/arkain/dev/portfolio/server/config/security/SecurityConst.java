package arkain.dev.portfolio.server.config.security;

import java.util.List;

public class SecurityConst {

    public static final List<String> ALLOWED_POST_APIS = List.of(
            "/api/auth/login",
            "/api/contact",
            "/api/visitor"
    );

    public static final List<String> ALLOWED_GET_APIS = List.of(
            "/api"
    );

    public static final String WEB_SOCKET_CONNECTION_ENDPOINT = "/ws/**";

    private SecurityConst() {
    }
}
