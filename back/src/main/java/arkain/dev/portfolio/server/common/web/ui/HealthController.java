package arkain.dev.portfolio.server.common.web.ui;

import arkain.dev.portfolio.server.common.dto.ResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping
    public ResponseDto<String> healthCheck() {
        return ResponseDto.ok("ok");
    }
}
