package arkain.dev.portfolio.server.visitor.app;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.visitor.app.dto.IpDto;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorDto;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorRequestDto;
import arkain.dev.portfolio.server.visitor.app.util.IpConverter;
import arkain.dev.portfolio.server.visitor.repo.jpa.VisitorRepository;
import arkain.dev.portfolio.server.visitor.repo.jpa.entity.Visitor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
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

    public List<VisitorDto> getHourlyVisitorIPs() {
        List<Visitor> visitors = findAll(); // 방문자 목록 가져오기

        // 오늘 날짜 가져오기
        LocalDate today = LocalDate.now();

        // 방문 시간을 기준으로 IP 주소 그룹화
        Map<Integer, List<IpDto>> hourlyVisitorIPs = visitors.stream()
                .filter(visitor -> visitor.getLocalDateTime().toLocalDate().equals(today))
                .collect(Collectors.groupingBy(
                        visitor -> visitor.getLocalDateTime().getHour(),
                        TreeMap::new, // 시간순 정렬을 위해 TreeMap 사용
                        Collectors.mapping(visitor ->
                                        IpDto.from(IpConverter.longToIp(visitor.getIp()), visitor.getLocalDateTime()),
                                Collectors.toList()
                        )
                ));

        // 0~23시까지 데이터가 없으면 빈 리스트로 채움
        for (int i = 0; i < 24; i++) {
            hourlyVisitorIPs.putIfAbsent(i, new ArrayList<>());
        }

        // Map<Integer, List<IpDto>>를 List<VisitorDto>로 변환
        return hourlyVisitorIPs.entrySet().stream()
                .map(entry -> VisitorDto.from(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }


    @Transactional
    public CommonSuccess save(VisitorRequestDto dto) {
        Visitor visitor = Visitor.from(IpConverter.ipToLong(dto.ip()), dto.visitedAt());
        visitorRepository.save(visitor);

        return new CommonSuccess(true);
    }
}
