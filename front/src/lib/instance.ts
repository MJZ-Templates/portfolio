import axios from "axios";
import { handleCheckAndSetToken, handleAPIError } from "./interceptor";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPublicInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  handleCheckAndSetToken,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  handleAPIError
);

export const axiosMultiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosMultiInstance.interceptors.request.use(
  handleCheckAndSetToken,
  (error) => Promise.reject(error)
);

axiosMultiInstance.interceptors.response.use(
  (response) => response,
  handleAPIError
);
