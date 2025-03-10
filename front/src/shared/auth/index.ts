import { AxiosResponse } from "axios";

import { PostLoginRequest, PostLoginResponse } from "./type";
import { axiosPublicInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path";

export const postSignIn = async (data: PostLoginRequest) => {
  const response = await axiosPublicInstance.post<
    PostLoginRequest,
    AxiosResponse<PostLoginResponse>
  >(PATH.LOGIN, data);

  return response.data;
};