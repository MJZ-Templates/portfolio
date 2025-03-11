package arkain.dev.portfolio.server.visitor.app;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.visitor.app.dto.IpDto;
import arkain.dev.portfolio.server.visitor.app.dto.TimeResponseDto;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorRequestDto;
import arkain.dev.portfolio.server.visitor.app.dto.DateCountResponseDto;
import arkain.dev.portfolio.server.visitor.app.util.IpConverter;
import arkain.dev.portfolio.server.visitor.repo.jpa.VisitorRepository;
import arkain.dev.portfolio.server.visitor.repo.jpa.entity.Visitor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VisitorService {

    private static final int WHOLE_HOUR = 24;

    private final VisitorNotificationService visitorNotificationService;
    private final VisitorRepository visitorRepository;

    public List<Visitor> findAll() {
        return visitorRepository.findAll();
    }

    public List<TimeResponseDto> getHourlyVisitorIPs() {
        List<Visitor> visitors = findAll(); // Retrieve the list of visitors

        // Get today's date
        LocalDate today = LocalDate.now();

        // group by IP address based on visit time
        Map<Integer, List<IpDto>> hourlyVisitorIPs = visitors.stream()
                .filter(visitor -> visitor.getLocalDateTime().toLocalDate().equals(today))
                .collect(Collectors.groupingBy(
                        visitor -> visitor.getLocalDateTime().getHour(),
                        TreeMap::new, // use TreeMap to sort by key
                        Collectors.mapping(visitor ->
                                        IpDto.from(IpConverter.longToIp(visitor.getIp()), visitor.getLocalDateTime()),
                                Collectors.toList()
                        )
                ));

        // Fill in empty lists for 0~23 hours
        for (int i = 0; i < WHOLE_HOUR; i++) {
            hourlyVisitorIPs.putIfAbsent(i, new ArrayList<>());
        }

        // Convert Map<Integer, List<IpDto> to List<VisitorDto>
        return hourlyVisitorIPs.entrySet().stream()
                .map(entry -> TimeResponseDto.from(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }


    @Transactional
    public CommonSuccess save(VisitorRequestDto dto) {
        Visitor visitor = Visitor.from(IpConverter.ipToLong(dto.ip()), dto.visitedAt());
        visitorNotificationService.visitorIncrease(IpDto.from(dto.ip(), dto.visitedAt()));
        visitorRepository.save(visitor);

        return new CommonSuccess(true);
    }

    public List<DateCountResponseDto> getWeeklyVisitors(LocalDate startDate) {
        if (startDate == null) {
            startDate = LocalDate.now();
        }
        LocalDate startOfWeek = startDate.with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfWeek = startDate.with(java.time.DayOfWeek.SUNDAY);

        LocalDateTime startDateTime = startOfWeek.atStartOfDay();
        LocalDateTime endDateTime = endOfWeek.atTime(23, 59, 59);

        List<Visitor> visitors = visitorRepository.findAllByWeek(startDateTime, endDateTime);

        Map<LocalDate, Long> visitorCounts = visitors.stream()
                .collect(Collectors.groupingBy(
                        visitor -> visitor.getLocalDateTime().toLocalDate(),
                        Collectors.counting()
                ));

        List<LocalDate> weekDays = startOfWeek.datesUntil(endOfWeek.plusDays(1)).toList(); // Java 9+

        return weekDays.stream()
                .map(date -> DateCountResponseDto.from(date, visitorCounts.getOrDefault(date, 0L).intValue()))
                .collect(Collectors.toList());
    }

    public List<DateCountResponseDto> getMonthlyVisitors(LocalDate startDate) {
        if (startDate == null) {
            startDate = LocalDate.now();
        }
        LocalDate startOfMonth = startDate.withDayOfMonth(1);
        LocalDate endOfMonth = startDate.withDayOfMonth(startDate.lengthOfMonth());

        LocalDateTime startDateTime = startOfMonth.minusMonths(5).atStartOfDay();
        LocalDateTime endDateTime = endOfMonth.atTime(23, 59, 59);

        List<Visitor> visitors = visitorRepository.findAllByWeek(startDateTime, endDateTime);

        Map<LocalDate, Long> visitorCounts = visitors.stream()
                .collect(Collectors.groupingBy(
                        visitor -> visitor.getLocalDateTime().withDayOfMonth(1).toLocalDate(),
                        Collectors.counting()
                ));

        List<LocalDate> months = startOfMonth.minusMonths(5).datesUntil(endOfMonth.plusDays(1), java.time.Period.ofMonths(1)).toList();

        return months.stream()
                .map(date -> DateCountResponseDto.from(date, visitorCounts.getOrDefault(date, 0L).intValue()))
                .collect(Collectors.toList());
    }
}
