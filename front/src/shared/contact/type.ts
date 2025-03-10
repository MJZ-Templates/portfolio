import { GeneralResponse } from "@/lib/generalResponse";

export interface GetContactResult {
    contactId: string;
    name: string;
    email: string;
    message: string;
}

export type GetContactResponse = GeneralResponse<GetContactResult[]>