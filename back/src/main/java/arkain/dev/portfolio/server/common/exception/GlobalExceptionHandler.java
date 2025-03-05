package arkain.dev.portfolio.server.common.exception;

import arkain.dev.portfolio.server.common.dto.ResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  // Exception thrown when binding fails in the converter
  @ExceptionHandler(value = {HttpMessageNotReadableException.class})
  public ResponseDto<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
    log.error(
            "handleHttpMessageNotReadableException() in GlobalExceptionHandler threw HttpMessageNotReadableException: {}",
            e.getMessage());
    return ResponseDto.fail(new CommonException(ErrorCode.BAD_REQUEST_JSON));
  }

  // Exception thrown when an unsupported HTTP method is used
  @ExceptionHandler(
          value = {NoHandlerFoundException.class, HttpRequestMethodNotSupportedException.class})
  public ResponseDto<?> handleNoPageFoundException(Exception e) {
    log.error(
            "handleNoPageFoundException() in GlobalExceptionHandler threw NoHandlerFoundException: {}",
            e.getMessage());
    return ResponseDto.fail(new CommonException(ErrorCode.NOT_FOUND_END_POINT));
  }

  // Exception thrown when the method argument type does not match
  @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
  public ResponseDto<?> handleArgumentNotValidException(MethodArgumentTypeMismatchException e) {
    log.error(
            "handleArgumentNotValidException() in GlobalExceptionHandler threw MethodArgumentTypeMismatchException: {}",
            e.getMessage());
    return ResponseDto.fail(e);
  }

  // Exception thrown when a required parameter is missing
  @ExceptionHandler(value = {MissingServletRequestParameterException.class})
  public ResponseDto<?> handleArgumentNotValidException(MissingServletRequestParameterException e) {
    log.error(
            "handleArgumentNotValidException() in GlobalExceptionHandler threw MethodArgumentNotValidException: {}",
            e.getMessage());
    return ResponseDto.fail(e);
  }

  // Exception defined by the developer
  @ExceptionHandler(value = {CommonException.class})
  @ResponseBody
  public ResponseDto<?> handleApiException(CommonException e, HttpServletResponse response) {
    log.error(
            "handleApiException() in GlobalExceptionHandler threw CommonException: {}",
            e.getMessage());
    response.setStatus(e.getErrorCode().getHttpStatus().value());
    return ResponseDto.fail(e);
  }

  // Server and database-related exceptions
  @ExceptionHandler(value = {Exception.class})
  public ResponseDto<?> handleException(Exception e, HttpServletResponse response) {
    log.error("handleException() in GlobalExceptionHandler threw Exception: {}", e.getMessage());
    e.printStackTrace();
    response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
    return ResponseDto.fail(new CommonException(ErrorCode.INTERNAL_SERVER_ERROR));
  }
}
