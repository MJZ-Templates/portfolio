package arkain.dev.portfolio.server.visitor.repo.jpa;

import arkain.dev.portfolio.server.visitor.repo.jpa.entity.Visitor;
import arkain.dev.portfolio.server.visitor.repo.jpa.entity.VisitorId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, VisitorId> {

    @Query("select v from Visitor v where v.id.visitedAt between :startOfWeek and :endOfWeek")
    List<Visitor> findAllByWeek(@Param("startOfWeek") LocalDateTime startOfWeek, @Param("endOfWeek") LocalDateTime endOfWeek);
}
