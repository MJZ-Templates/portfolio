package arkain.dev.portfolio.server.common.dto;

import lombok.Builder;

@Builder
public record CommonSuccess(boolean isSuccess) {

  public static CommonSuccess fromEntity(boolean success) {
    return CommonSuccess.builder().isSuccess(success).build();
  }
}
