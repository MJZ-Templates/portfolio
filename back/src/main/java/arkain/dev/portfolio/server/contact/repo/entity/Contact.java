package arkain.dev.portfolio.server.contact.repo.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String message;

    public static Contact of(Long id, String name, String email, String message) {
        Contact contact = new Contact();
        contact.id = id;
        contact.name = name;
        contact.email = email;
        contact.message = message;

        return contact;
    }
}
