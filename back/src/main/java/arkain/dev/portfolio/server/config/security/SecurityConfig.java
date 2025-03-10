package arkain.dev.portfolio.server.config.security;

import arkain.dev.portfolio.server.config.security.jwt.JwtProcessingFilter;
import arkain.dev.portfolio.server.config.web.CorsConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static arkain.dev.portfolio.server.config.security.SecurityConst.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProcessingFilter jwtProcessingFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfig corsConfig) throws Exception {
        http
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
                .headers(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, ALLOWED_GET_APIS.toArray(new String[0])).permitAll()
                        .requestMatchers(HttpMethod.POST, ALLOWED_POST_APIS.toArray(new String[0])).permitAll()
                        .requestMatchers(WEB_SOCKET_CONNECTION_ENDPOINT).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtProcessingFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

