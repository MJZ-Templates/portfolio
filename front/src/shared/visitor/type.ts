import { GeneralResponse } from "@/lib/generalResponse";

export interface HourResult {
    time: number;
    visitors: Visitor[];
}

export interface Visitor {
    ip: string;
    visitedAt: Date;
}

export type GetVisitorHourResponse = GeneralResponse<HourResult[]>

export interface WeekResult {
    date: Date;
    count: number;
}

export type GetVisitorWeeklyResponse = GeneralResponse<WeekResult[]>

export interface PostVisitorRequest {
    ip: string;
    visitedAt: Date;
}