package arkain.dev.portfolio.server.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
  // Method Not Allowed Error
  METHOD_NOT_ALLOWED(40500, HttpStatus.METHOD_NOT_ALLOWED, "The HTTP method is not supported."),

  // Not Found Error
  NOT_FOUND_END_POINT(40400, HttpStatus.NOT_FOUND, "The requested API endpoint does not exist."),
  NOT_FOUND_RESOURCE(40401, HttpStatus.NOT_FOUND, "The requested resource does not exist."),
  NOT_FOUND_LOGIN_USER(40402, HttpStatus.NOT_FOUND, "The logged-in user does not exist."),
  NOT_FOUND_MEMBER(40403, HttpStatus.NOT_FOUND, "The requested user does not exist."),

  // Invalid Argument Error
  MISSING_REQUEST_PARAMETER(40000, HttpStatus.BAD_REQUEST, "A required request parameter is missing."),
  INVALID_ARGUMENT(40001, HttpStatus.BAD_REQUEST, "The request contains an invalid argument."),
  INVALID_PARAMETER_FORMAT(40002, HttpStatus.BAD_REQUEST, "The request contains an invalid argument format."),
  INVALID_HEADER_ERROR(40003, HttpStatus.BAD_REQUEST, "The request contains an invalid header."),
  MISSING_REQUEST_HEADER(40004, HttpStatus.BAD_REQUEST, "A required request header is missing."),
  BAD_REQUEST_PARAMETER(40005, HttpStatus.BAD_REQUEST, "The request contains an incorrect parameter."),
  BAD_REQUEST_JSON(40006, HttpStatus.BAD_REQUEST, "The request contains an invalid JSON format."),
  INVALID_ACCESS_URL(4007, HttpStatus.BAD_REQUEST, "Invalid user access."),

  // Access Denied Error
  ACCESS_DENIED(40300, HttpStatus.FORBIDDEN, "Access is denied."),
  NOT_MATCH_AUTH_CODE(40301, HttpStatus.FORBIDDEN, "The authentication code does not match."),
  NOT_MATCH_USER(40302, HttpStatus.FORBIDDEN, "The user does not match."),

  // Unauthorized Error
  FAILURE_LOGIN(40100, HttpStatus.UNAUTHORIZED, "Incorrect username or password."),

  // Internal Server Error
  INTERNAL_SERVER_ERROR(50000, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error.");

  private final Integer code; // Error code
  private final HttpStatus httpStatus; // Corresponding HTTP status
  private final String message; // Error message
  }
