package arkain.dev.portfolio.server.auth.repo;

import arkain.dev.portfolio.server.auth.domain.Member;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ConstMemberRepository implements MemberRepository{

    @Value("${spring.security.const.user}")
    private String name;

    @Value("${spring.security.const.password}")
    private String password;

    @Override
    public Optional<Member> findByUsername(String username) {
        return Optional.of(new Member(name, password));
    }
}
