package arkain.dev.portfolio.server.contact.repo;

import arkain.dev.portfolio.server.contact.repo.entity.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository extends MongoRepository<Contact, String> {
}
