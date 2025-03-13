package arkain.dev.portfolio.server.visitor.app.dto;

import java.time.LocalDate;

public record DateCountResponseDto(LocalDate date, int count) {

    public static DateCountResponseDto from(LocalDate date, int count) {
        return new DateCountResponseDto(date, count);
    }
}
