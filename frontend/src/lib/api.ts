import axios, { AxiosError, AxiosResponse } from 'axios';
import { Id, toast } from 'react-toastify';

import { ApiError, ApiResponse } from '@/types/api';

import { getToken } from './cookies';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_API_URL;

let toastId: Id;
const isBrowser = typeof window !== 'undefined';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
  timeoutErrorMessage: 'No internet connection',
});

api.interceptors.request.use(async config => {
  let token: string | undefined;

  if (isBrowser) {
    token = getToken();
  } else {
    const { cookies } = await import('next/headers');
    token = cookies().get('@kel4/token')?.value;
  }

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  if (isBrowser && config.toastify) {
    toastId = toast.loading(config.loadingMessage || 'Loading...');
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    if (isBrowser && response.config.toastify) {
      toast.update(toastId, {
        render: response.data.message,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (isBrowser && error.config?.toastify) {
      toast.update(toastId, {
        render:
          error.response?.data.error ||
          error.response?.data.message ||
          error.message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
    return Promise.reject({ ...error });
  },
);

export default api;
