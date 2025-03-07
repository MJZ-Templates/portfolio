package arkain.dev.portfolio.server.contact.app;

import arkain.dev.portfolio.server.common.dto.CommonSuccess;
import arkain.dev.portfolio.server.contact.app.dto.ContactDto;
import arkain.dev.portfolio.server.common.dto.IdDto;
import arkain.dev.portfolio.server.contact.repo.ContactRepository;
import arkain.dev.portfolio.server.contact.repo.entity.Contact;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public List<ContactDto> findAll() {
        return contactRepository.findAll().stream()
                .map(ContactDto::from)
                .toList();
    }

    @Transactional
    public CommonSuccess save(ContactDto dto) {
        Contact contact = Contact.of(dto.contactId(), dto.name(), dto.email(), dto.message());
        contactRepository.save(contact);

        return new CommonSuccess(true);
    }

    @Transactional
    public CommonSuccess deleteContact(String id) {
        contactRepository.deleteById(id);

        return new CommonSuccess(true);
    }

    @Transactional
    public CommonSuccess deleteAll(IdDto dto) {
        contactRepository.deleteAllById(dto.ids());

        return new CommonSuccess(true);
    }
}
