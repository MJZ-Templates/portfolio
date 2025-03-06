package arkain.dev.portfolio.server.contact.repo;

import arkain.dev.portfolio.server.contact.repo.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, String> {
}
