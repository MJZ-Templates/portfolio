import { GetVisitorHourResponse } from "./type";
import { axiosInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path"

export const getVisitorHour = async () => {
    const response = await axiosInstance.get<
    GetVisitorHourResponse
    >(PATH.VISITOR_HOUR);

    return response.data;
}