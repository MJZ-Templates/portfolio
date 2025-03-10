package arkain.dev.portfolio.server.visitor.app.dto;

import java.util.List;

public record VisitorDto(Integer time, List<IpDto> visitors) {

    public static VisitorDto from(Integer time, List<IpDto> ips) {
        return new VisitorDto(time, ips);
    }
}
