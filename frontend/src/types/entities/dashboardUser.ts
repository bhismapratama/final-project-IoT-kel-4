import { ApiResponse } from '../api';

export type DashboardUser = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardUserResponse = ApiResponse<{
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}>;

export type UpdateDashboardUser = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
