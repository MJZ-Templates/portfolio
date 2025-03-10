// axios.d.ts
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
  }
}
