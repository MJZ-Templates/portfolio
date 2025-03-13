package arkain.dev.portfolio.server.contact.app.dto;


import arkain.dev.portfolio.server.contact.repo.entity.Contact;

import java.time.LocalDateTime;

public record ContactDto(Long contactId, String name, String email, String message, LocalDateTime createdAt) {

    public static ContactDto from(Contact contact) {
        return new ContactDto(contact.getId(), contact.getName(), contact.getEmail(), contact.getMessage(), contact.getCreatedAt());
    }
}
