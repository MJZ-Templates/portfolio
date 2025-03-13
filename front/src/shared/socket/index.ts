import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';

import { PATH } from "@/lib/constant/path";
import { SocketMessageResponse } from "./type";

export const socketConnect = (accessToken: string) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const socket = new SockJS(`${baseURL}${PATH.CONNECT_SOCKET}`);
    const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
            Authorization: accessToken
        }
    });

    return stompClient;
}

export const onConnectHandler = (stompClient: any) => (frame: any) => {
    stompClient.subscribe(PATH.SUBSCRIBE_SOCKET, (message: SocketMessageResponse) => {
        return message;
    });
}

export const configureSocketClient = (
    StompClient: Client,
    onConnect: (frame: any) => void,
    onError: (frame: any) => void
) => {
    StompClient.onConnect = onConnect;
    StompClient.onStompError = onError;
};

export const onErrorHandler = (frame: any) => {
    console.error('Broker reported error: ', frame.headers['message']);
    console.error('Additional details: ', frame.body);
  };