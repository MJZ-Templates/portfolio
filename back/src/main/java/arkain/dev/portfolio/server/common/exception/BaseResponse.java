package arkain.dev.portfolio.server.common.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@JsonPropertyOrder({"isSuccess", "code", "message", "result"})
public class BaseResponse<T> {

  @JsonProperty("isSuccess")
  private Boolean isSuccess;

  private String code;
  private String message;

  @JsonInclude(JsonInclude.Include.NON_NULL)
  private T data;

  // Response for successful requests
  public static <T> BaseResponse<T> onSuccess(T data) {
    return new BaseResponse<>(true, "200", "Request success", data);
  }

  public static <T> BaseResponse<List<T>> onSuccess(List<T> data) {
    return new BaseResponse<>(true, "200", "Request success", data);
  }

  public static <T> BaseResponse<T> onSuccess(BaseResponseStatus code, T data) {
    return new BaseResponse<>(
        true, String.valueOf(code.getHttpStatus().value()), code.getMessage(), data);
  }

  // Reponse for failed requests
  public static <T> BaseResponse<T> onFailure(BaseResponseStatus code, T data) {
    return new BaseResponse<>(
        false, String.valueOf(code.getHttpStatus().value()), code.getMessage(), data);
  }
}
