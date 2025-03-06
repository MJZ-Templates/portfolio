package arkain.dev.portfolio.server.auth.app;

import arkain.dev.portfolio.server.auth.domain.Member;
import arkain.dev.portfolio.server.auth.repo.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member findMember(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow();
    }
}
