package arkain.dev.portfolio.server.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BaseResponseStatus {
  SUCCESS(HttpStatus.CREATED, "Request success"),
  NO_USER(HttpStatus.BAD_REQUEST, "User not found"),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
