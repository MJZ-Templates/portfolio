package arkain.dev.portfolio.server.config.security;

import java.util.List;

public class SecurityConst {

    public static final List<String> ALLOWED_POST_APIS = List.of(
            "/api/auth/login",
            "/api/auth/register"
    );

    private SecurityConst() {
    }
}
