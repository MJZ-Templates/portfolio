package arkain.dev.portfolio.server.auth.repo;



import arkain.dev.portfolio.server.auth.domain.Member;

import java.util.Optional;

public interface MemberRepository {
    Optional<Member> findByUsername(String username);
}
