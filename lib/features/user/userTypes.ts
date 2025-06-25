import { ForgotPassword, Login, SignUp, User } from "@/lib/schemas/userSchema";

// API response types
export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignUpResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Request types
export type LoginRequest = Login;
export type SignUpRequest = SignUp;
export type ForgotPasswordRequest = ForgotPassword;
export type UpdateUserRequest = Partial<Pick<User, "fullname" | "email">>;
