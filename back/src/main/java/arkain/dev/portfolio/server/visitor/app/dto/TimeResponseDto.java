package arkain.dev.portfolio.server.visitor.app.dto;

import java.util.List;

public record TimeResponseDto(Integer time, List<IpDto> visitors) {

    public static TimeResponseDto from(Integer time, List<IpDto> ips) {
        return new TimeResponseDto(time, ips);
    }
}
