package arkain.dev.portfolio.server.config.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static arkain.dev.portfolio.server.config.web.WebConst.*;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        corsConfig.setAllowedOriginPatterns(ALLOWED_ORIGINS);
        corsConfig.setAllowedMethods(ALLOWED_HTTP_METHODS);
        corsConfig.setAllowedHeaders(ALLOWED_HTTP_HEADERS);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return source;
    }
}
