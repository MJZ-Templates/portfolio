package arkain.dev.portfolio.server.visitor.app.dto;

import java.time.LocalDateTime;

public record VisitorRequestDto(String ip, LocalDateTime visitedAt) {
}
