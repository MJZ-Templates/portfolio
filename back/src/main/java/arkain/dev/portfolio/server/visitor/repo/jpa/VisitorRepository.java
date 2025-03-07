package arkain.dev.portfolio.server.visitor.repo.jpa;

import arkain.dev.portfolio.server.visitor.repo.jpa.entity.Visitor;
import arkain.dev.portfolio.server.visitor.repo.jpa.entity.VisitorId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorRepository extends JpaRepository<Visitor, VisitorId> {
}
