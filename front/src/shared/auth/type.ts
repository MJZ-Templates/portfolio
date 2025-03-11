import { GeneralResponse } from "@/lib/generalResponse";

export interface PostLoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResult {
    accessToken: string;
  }
  
  export type PostLoginResponse = GeneralResponse<LoginResult>;