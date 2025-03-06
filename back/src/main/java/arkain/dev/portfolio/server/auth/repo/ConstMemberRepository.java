package arkain.dev.portfolio.server.auth.repo;

import arkain.dev.portfolio.server.auth.domain.Member;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ConstMemberRepository implements MemberRepository{

    @Override
    public Optional<Member> findByUsername(String username) {
        return Optional.of(new Member("user", "password"));
    }
}
