import { GeneralResponse } from "@/lib/generalResponse";

export interface GetContactResult {
    contactId: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export type GetContactResponse = GeneralResponse<GetContactResult[]>

export interface PostContactRequest {
    name: string;
    email: string;
    message: string;
}