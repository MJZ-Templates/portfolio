package arkain.dev.portfolio.server.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
  // Method Not Allowed Error
  METHOD_NOT_ALLOWED(40500, HttpStatus.METHOD_NOT_ALLOWED, "HTTP method not supported."),

  // Not Found Error
  NOT_FOUND_END_POINT(40400, HttpStatus.NOT_FOUND, "API endpoint does not exist."),
  NOT_FOUND_RESOURCE(40400, HttpStatus.NOT_FOUND, "Resource does not exist."),
  NOT_FOUND_LOGIN_USER(40401, HttpStatus.NOT_FOUND, "Logged-in user does not exist."),
  NOT_FOUND_AUTHORIZATION_HEADER(40401, HttpStatus.NOT_FOUND, "Authorization header does not exist."),
  NOT_FOUND_MEMBER(40402, HttpStatus.NOT_FOUND, "User does not exist."),

  // Invalid Argument Error
  MISSING_REQUEST_PARAMETER(40000, HttpStatus.BAD_REQUEST, "Required request parameter is missing."),
  INVALID_ARGUMENT(40001, HttpStatus.BAD_REQUEST, "Invalid argument in request."),
  INVALID_PARAMETER_FORMAT(40002, HttpStatus.BAD_REQUEST, "Invalid parameter format in request."),
  INVALID_HEADER_ERROR(40003, HttpStatus.BAD_REQUEST, "Invalid header."),
  MISSING_REQUEST_HEADER(40004, HttpStatus.BAD_REQUEST, "Required request header is missing."),
  BAD_REQUEST_PARAMETER(40005, HttpStatus.BAD_REQUEST, "Bad request parameter."),
  BAD_REQUEST_JSON(40006, HttpStatus.BAD_REQUEST, "Bad JSON format."),

  // Access Denied Error
  ACCESS_DENIED(40300, HttpStatus.FORBIDDEN, "Access denied."),
  NOT_MATCH_AUTH_CODE(40301, HttpStatus.FORBIDDEN, "Authentication code does not match."),
  NOT_MATCH_USER(40302, HttpStatus.FORBIDDEN, "User does not match."),


  // Unauthorized Error
  FAILURE_LOGIN(40100, HttpStatus.UNAUTHORIZED, "Invalid username or password."),
  EXPIRED_TOKEN_ERROR(40101, HttpStatus.UNAUTHORIZED, "Token has expired."),
  INVALID_TOKEN_ERROR(40102, HttpStatus.UNAUTHORIZED, "Invalid token."),
  TOKEN_MALFORMED_ERROR(40103, HttpStatus.UNAUTHORIZED, "Malformed token."),
  TOKEN_TYPE_ERROR(40104, HttpStatus.UNAUTHORIZED, "Token type does not match or is empty."),
  TOKEN_UNSUPPORTED_ERROR(40105, HttpStatus.UNAUTHORIZED, "Unsupported token."),
  TOKEN_GENERATION_ERROR(40106, HttpStatus.UNAUTHORIZED, "Failed to generate token."),
  TOKEN_UNKNOWN_ERROR(40107, HttpStatus.UNAUTHORIZED, "Unknown token."),
  EXPIRED_REFRESH_TOKEN_ERROR(40108, HttpStatus.UNAUTHORIZED, "Refresh token has expired."),

  // Internal Server Error
  INTERNAL_SERVER_ERROR(50000, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error.");

  private final Integer code;
  private final HttpStatus httpStatus;
  private final String message;
}

