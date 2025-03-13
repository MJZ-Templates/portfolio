export const PATH = {
    ROOT: "/",
    LANDING: "/",
  
    LOGIN: "/auth/login",
    AUTH: "/auth",

    VISITOR: "/visitor",
    VISITOR_HOUR: "/visitor/hour",
    VISITOR_WEEKLY: "/visitor/week",

    CONTACT_MESSAGE: "/contact",

    CONNECT_SOCKET: "/ws/visitor",
    SUBSCRIBE_SOCKET: "/topic/visitor",
    SEND_MESSAGE_SOCKET: "/app/visitor",
  } as const;