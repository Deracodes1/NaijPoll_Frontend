// src/app/types/auth.types.ts

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  state: string;
}

export interface RegisterResponseUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface RegisterResponseData {
  access_token: string;
  user: RegisterResponseUser;
}

export interface ApiSuccessResponse<T> {
  success: true;
  statusCode: number;
  data: T;
  message: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}
