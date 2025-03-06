package arkain.dev.portfolio.server.contact.ui;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.common.dto.ResponseDto;
import arkain.dev.portfolio.server.contact.app.ContactService;
import arkain.dev.portfolio.server.contact.app.dto.ContactDto;
import arkain.dev.portfolio.server.common.dto.IdDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseDto<List<ContactDto>> getAllContacts() {
        return ResponseDto.ok(contactService.findAll());
    }

    @PostMapping
    public ResponseDto<CommonSuccess> saveContact(@RequestBody ContactDto dto) {
        return ResponseDto.created(contactService.save(dto));
    }

    @DeleteMapping("/{contactId}")
    public ResponseDto<CommonSuccess> deleteContact(@PathVariable("contactId") String id) {
        return ResponseDto.ok(contactService.deleteContact(id));
    }

    @DeleteMapping
    public ResponseDto<CommonSuccess> deleteContacts(@RequestBody IdDto dto) {
        return ResponseDto.ok(contactService.deleteAll(dto));
    }
}
