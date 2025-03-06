package arkain.dev.portfolio.server.visitor.app.dto;

import java.time.LocalDateTime;

public record VisitorDto(String ip, LocalDateTime visitedAt) {
}
