package arkain.dev.portfolio.server.visitor.app;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorDto;
import arkain.dev.portfolio.server.visitor.app.util.IpConverter;
import arkain.dev.portfolio.server.visitor.repo.jpa.VisitorRepository;
import arkain.dev.portfolio.server.visitor.repo.jpa.entity.Visitor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VisitorService {

    private final VisitorRepository visitorRepository;

    public List<Visitor> findAll() {
        return visitorRepository.findAll();
    }

    public Map<Integer, Long> getHourlyStats() {
        List<Visitor> visitors = findAll();

        return visitors.stream()
                .collect(Collectors.groupingBy(visitor -> visitor.getLocalDateTime().getHour(),
                        TreeMap::new,
                        Collectors.counting()));
    }

    @Transactional
    public CommonSuccess save(VisitorDto dto) {
        Visitor visitor = Visitor.from(IpConverter.ipToLong(dto.ip()), dto.visitedAt());
        visitorRepository.save(visitor);

        return new CommonSuccess(true);
    }
}
