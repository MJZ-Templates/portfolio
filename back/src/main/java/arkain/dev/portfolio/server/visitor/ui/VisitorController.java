package arkain.dev.portfolio.server.visitor.ui;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.common.dto.ResponseDto;
import arkain.dev.portfolio.server.visitor.app.VisitorService;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorDto;
import arkain.dev.portfolio.server.visitor.app.dto.VisitorRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public ResponseDto<List<VisitorDto>> getHourlyStats() {
        return ResponseDto.ok(visitorService.getHourlyVisitorIPs());
    }
}
