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