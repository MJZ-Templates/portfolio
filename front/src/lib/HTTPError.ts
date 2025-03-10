import { HTTP_STATUS_CODE } from "@/lib/constant/api"

export class HTTPError extends Error {
  statusCode: number;

  code?: number;

  constructor(statusCode: number, message?: string, code?: number) {
    super(message);

    let name = 'HTTPError';

    switch (statusCode) {
      case HTTP_STATUS_CODE.BAD_REQUEST: {
        name += ': BAD_REQUESET';
        break;
      }
      case HTTP_STATUS_CODE.UNAUTHORIZED: {
        name += ': UNAUTHORIZED';
        break;
      }
      case HTTP_STATUS_CODE.FORBIDDEN: {
        name += ': FORBIDDEN';
        break;
      }
      case HTTP_STATUS_CODE.NOT_FOUND: {
        name += ': NOT_FOUND';
        break;
      }
      case HTTP_STATUS_CODE.CONTENT_TOO_LARGE: {
        name += ': CONTENT_TOO_LARGE';
        break;
      }
      case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
        name += ': INTERNAL_SERVER_ERROR';
        break;
      }
    }

    this.name = name;
    this.statusCode = statusCode;
    this.code = code;
  }
}