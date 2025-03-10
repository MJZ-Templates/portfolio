package arkain.dev.portfolio.server.visitor.app;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorDto;
import arkain.dev.portfolio.server.visitor.app.util.IpConverter;
import arkain.dev.portfolio.server.visitor.repo.jpa.VisitorRepository;
import arkain.dev.portfolio.server.visitor.repo.jpa.entity.Visitor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

        // 오늘 날짜 가져오기
        LocalDate today = LocalDate.now();

        // 오늘 날짜에 해당하는 방문자만 필터링
        Map<Integer, Long> hourlyStats = visitors.stream()
                .filter(visitor -> visitor.getLocalDateTime().toLocalDate().equals(today)) // 오늘 날짜 필터링
                .collect(Collectors.groupingBy(
                        visitor -> visitor.getLocalDateTime().getHour(),
                        TreeMap::new,
                        Collectors.counting()
                ));

        // 0~23시까지 데이터가 없으면 0L로 채움
        for (int i = 0; i < 24; i++) {
            hourlyStats.putIfAbsent(i, 0L);
        }

        return hourlyStats;
    }


    @Transactional
    public CommonSuccess save(VisitorDto dto) {
        Visitor visitor = Visitor.from(IpConverter.ipToLong(dto.ip()), dto.visitedAt());
        visitorRepository.save(visitor);

        return new CommonSuccess(true);
    }
}
