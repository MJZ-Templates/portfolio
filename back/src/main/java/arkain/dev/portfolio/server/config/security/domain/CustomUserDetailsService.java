package arkain.dev.portfolio.server.config.security.domain;

import arkain.dev.portfolio.server.auth.domain.Member;
import arkain.dev.portfolio.server.auth.repo.MemberRepository;
import arkain.dev.portfolio.server.common.exception.CommonException;
import arkain.dev.portfolio.server.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member entity = memberRepository.findByUsername(username)
            .orElseThrow(() -> new CommonException(ErrorCode.NOT_FOUND_LOGIN_USER));

        return new CustomUserDetails(entity);
    }
}
