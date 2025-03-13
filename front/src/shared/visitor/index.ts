import { AxiosResponse } from "axios";

import { GetVisitorHourResponse, GetVisitorWeeklyResponse, PostVisitorRequest } from "./type";
import { axiosInstance, axiosPublicInstance } from "@/lib/instance";
import { PATH } from "@/lib/constant/path"
import { EmptyResponse } from "@/lib/generalResponse";

export const getVisitorHour = async () => {
    const response = await axiosInstance.get<
    GetVisitorHourResponse
    >(PATH.VISITOR_HOUR);

    return response.data;
}

interface GetVisitorWeeklyParams {
    params: {
        startDate: string;
    }
}

export const getVisitorWeekly = async ({ params }: GetVisitorWeeklyParams) => {
    const response = await axiosInstance.get<GetVisitorWeeklyResponse>
    (PATH.VISITOR_WEEKLY, {
        params,
    });

    return response.data;
}

export const postVisitor = async (data: PostVisitorRequest) => {
    const response = await axiosPublicInstance.post<
    PostVisitorRequest,
    AxiosResponse<EmptyResponse>
    >(PATH.VISITOR, data);

    return response.data;
}