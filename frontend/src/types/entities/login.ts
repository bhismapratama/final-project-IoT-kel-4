import { ApiResponse } from '@/types/api';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ApiResponse<{
  token: string;
}>;
