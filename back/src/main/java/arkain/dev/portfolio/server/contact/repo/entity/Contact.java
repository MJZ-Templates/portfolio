package arkain.dev.portfolio.server.contact.repo.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "contacts")
public class Contact {

    @Id
    private String id;
    private String name;
    private String email;
    private String message;

    public static Contact of(String id, String name, String email, String message) {
        Contact contact = new Contact();
        contact.id = id;
        contact.name = name;
        contact.email = email;
        contact.message = message;

        return contact;
    }
}
