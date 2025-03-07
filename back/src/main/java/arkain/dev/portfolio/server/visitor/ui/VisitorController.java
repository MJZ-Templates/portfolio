package arkain.dev.portfolio.server.visitor.ui;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.common.dto.ResponseDto;
import arkain.dev.portfolio.server.visitor.app.VisitorService;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visitor")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService visitorService;

    @PostMapping
    public ResponseDto<CommonSuccess> save(@RequestBody VisitorDto dto) {
        return ResponseDto.created(visitorService.save(dto));
    }

    @GetMapping("/hour")
    public ResponseDto<?> getHourlyStats() {
        return ResponseDto.ok(visitorService.getHourlyStats());
    }
}
