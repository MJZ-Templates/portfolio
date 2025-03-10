export interface GeneralResponse<T> {
  success: boolean;
  error: string;
  data: T;
}