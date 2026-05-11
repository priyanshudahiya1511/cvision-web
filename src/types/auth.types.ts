export interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyForgotOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  resetToken: string;
  newPassword: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface ApiResponse<T = null> {
  message: string;
  data?: T;
}
