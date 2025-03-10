package arkain.dev.portfolio.server.auth.domain;

import arkain.dev.portfolio.server.common.exception.CommonException;
import arkain.dev.portfolio.server.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Member {

    private String username;
    private String password;

    public void validate(String username, String password) {
        if (!this.username.equals(username) || !this.password.equals(password)) {
            throw new CommonException(ErrorCode.NOT_MATCH_AUTH_CODE);
        }
    }
}
