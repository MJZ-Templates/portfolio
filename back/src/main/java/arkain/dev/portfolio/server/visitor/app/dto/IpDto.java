package arkain.dev.portfolio.server.visitor.app.dto;

import java.time.LocalDateTime;

public record IpDto(String ip, LocalDateTime visitedAt) {

    public static IpDto from(String ip, LocalDateTime visitedAt) {
        return new IpDto(ip, visitedAt);
    }
}
