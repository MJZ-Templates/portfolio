package arkain.dev.portfolio.server.visitor.app;

import arkain.dev.portfolio.server.visitor.app.dto.IpDto;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VisitorNotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public void visitorIncrease(IpDto dto) {
        simpMessagingTemplate.convertAndSend("/topic/visitor", dto);
    }
}
