import { AxiosResponse } from "axios";

import { PostLoginRequest, PostLoginResponse } from "./type";
import { axiosInstance, axiosPublicInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path";
import { EmptyResponse } from "@/lib/generalResponse";

export const postSignIn = async (data: PostLoginRequest) => {
  const response = await axiosPublicInstance.post<
    PostLoginRequest,
    AxiosResponse<PostLoginResponse>
  >(PATH.LOGIN, data);

  return response.data;
};

export const postAuthToken = async () => {
  const response = await axiosInstance.post<
  EmptyResponse
  >(PATH.AUTH);

  return response.data;
}