package arkain.dev.portfolio.server.visitor.repo.jpa.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Visitor {

    @EmbeddedId
    private VisitorId id;

    public static Visitor from(Long ip, LocalDateTime visitedAt) {
        Visitor visitor = new Visitor();
        visitor.id = new VisitorId(ip, visitedAt);

        return visitor;
    }

    public LocalDateTime getLocalDateTime() {
        return this.id.getVisitedAt();
    }

    public Long getIp() {
        return this.id.getIp();
    }
}
