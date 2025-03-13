export interface GeneralResponse<T> {
  success: boolean;
  error: string;
  data: T;
}

export interface EmptyResponse {
  success: boolean;
  data: {
    isSuccess: boolean;
  };
  error: string | null;
}