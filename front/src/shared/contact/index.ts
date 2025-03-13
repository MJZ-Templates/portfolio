import { AxiosResponse } from "axios";

import { GetContactResponse, PostContactRequest } from "./type";
import { EmptyResponse } from "@/lib/generalResponse";
import { axiosInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path";

export const getContactMessage = async () => {
  const response = await axiosInstance.get<
  GetContactResponse
  >(PATH.CONTACT_MESSAGE);

  return response.data;
};

export const postContactMessage = async (data: PostContactRequest) => {
    const response = await axiosInstance.post<
    PostContactRequest,
    AxiosResponse<EmptyResponse>
    >(PATH.CONTACT_MESSAGE, data);
  
    return response.data;
  };