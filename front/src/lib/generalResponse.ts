export interface GeneralResponse<T> {
  success: boolean;
  error: string;
  data: T;
}

export interface EmptyResponse {
  success: boolean;
  error: string;
  data: {
    isSuccess: boolean;
  }
}