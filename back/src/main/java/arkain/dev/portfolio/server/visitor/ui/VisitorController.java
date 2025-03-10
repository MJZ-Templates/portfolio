package arkain.dev.portfolio.server.visitor.ui;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.common.dto.ResponseDto;
import arkain.dev.portfolio.server.visitor.app.VisitorService;
import arkain.dev.portfolio.server.visitor.app.dto.TimeResponseDto;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorRequestDto;
import arkain.dev.portfolio.server.visitor.app.dto.WeekResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/visitor")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService visitorService;

    @PostMapping
    public ResponseDto<CommonSuccess> save(@RequestBody VisitorRequestDto dto) {
        return ResponseDto.created(visitorService.save(dto));
    }

    @GetMapping("/hour")
    public ResponseDto<List<TimeResponseDto>> getHourlyStats() {
        return ResponseDto.ok(visitorService.getHourlyVisitorIPs());
    }

    @GetMapping("/week")
    public ResponseDto<List<WeekResponseDto>> getWeeklyStats(@RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        return ResponseDto.ok(visitorService.getWeeklyVisitors(startDate));
    }
}
