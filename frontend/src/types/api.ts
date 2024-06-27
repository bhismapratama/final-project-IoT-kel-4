import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    toastify?: boolean;
    loadingMessage?: string;
  }
}

export type ApiResponse<TData> = {
  code: number;
  message: string;
  user: TData;
  token: string;
};

export type ApiError = {
  status: boolean;
  message: string;
  error: string;
};

export interface ApiReturn<T> {
  data: T;
  message: string;
}

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

type PaginatedMeta = {
  count: number;
  page: number;
  per_page: number;
  max_page: number;
};

export interface PaginatedApiResponse<
  DataType,
  MetaType extends PaginatedMeta = PaginatedMeta,
> {
  code: number;
  success: string;
  data: DataType;
  meta: MetaType;
}

export type ApiResponseMeta<TData> = {
  status: boolean;
  message: string;
  data: TData;
  meta: Meta;
};

type Meta = {
  page: number;
  per_page: number;
  max_page: number;
  count: number;
};
