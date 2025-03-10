import { GetContactResponse } from "./type";
import { axiosInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path";

export const getContact = async () => {
  const response = await axiosInstance.get<
  GetContactResponse
  >(PATH.CONTACT_MESSAGE);

  return response.data;
};