import { GetVisitorHourResponse, GetVisitorWeeklyResponse } from "./type";
import { axiosInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path"

export const getVisitorHour = async () => {
    const response = await axiosInstance.get<
    GetVisitorHourResponse
    >(PATH.VISITOR_HOUR);

    return response.data;
}

interface GetVisitorWeeklyPraams {
    params: {
        startDate: string;
    }
}

export const getVisitorWeekly = async ({ params }: GetVisitorWeeklyPraams) => {
    const response = await axiosInstance.get<GetVisitorWeeklyResponse>
    (PATH.VISITOR_WEEKLY, {
        params,
    });

    return response.data;
}