package arkain.dev.portfolio.server.visitor.app.dto;

import java.time.LocalDate;

public record WeekResponseDto(LocalDate date, int count) {

    public static WeekResponseDto from(LocalDate date, int count) {
        return new WeekResponseDto(date, count);
    }
}
