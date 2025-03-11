import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosInstance
} from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPublicInstance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosMultiInstance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const addAccessTokenToRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(
  addAccessTokenToRequest,
  (error) => Promise.reject(error)
);

axiosMultiInstance.interceptors.request.use(
  addAccessTokenToRequest,
  (error) => Promise.reject(error)
);

const handle401Error = (error: AxiosError): Promise<void | AxiosResponse> => {
  const { response } = error;
  if (response && response.status === 403) {
    alert('Your login has expired. Please log in again.');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ACCESS_TOKEN');
      // Redirect to login page
      window.location.href = '/';
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  handle401Error
);

axiosMultiInstance.interceptors.response.use(
  (response) => response,
  handle401Error
);

// 서버가 꺼져있을 때 발생하는 네트워크 에러 처리
const handleNetworkError = (error: AxiosError): Promise<void | AxiosResponse> => {
  if (!error.response) {
    if (typeof window !== 'undefined') {
      window.location.href = '/network-error'; 
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  handleNetworkError
);

axiosMultiInstance.interceptors.response.use(
  (response) => response,
  handleNetworkError
);
