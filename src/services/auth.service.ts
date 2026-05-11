import axiosInstance from "@/lib/axios";
import {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyForgotOtpPayload,
} from "@/types/auth.types";

export const registerService = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

export const verifyOtpService = async (
  payload: VerifyForgotOtpPayload,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/verify-email", payload);
  return response.data;
};

export const loginService = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const logoutService = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const forgotPasswordService = async (payload: ForgotPasswordPayload) => {
  const response = await axiosInstance.post("/auth/forgot-password", payload);
  return response.data;
};

export const verifyForgotOtpService = async (
  payload: VerifyForgotOtpPayload,
) => {
  const response = await axiosInstance.post(
    "/auth/verify-forgot-password-otp",
    payload,
  );
  return response.data;
};

export const resetPasswordService = async (payload: ResetPasswordPayload) => {
  const response = await axiosInstance.post("/auth/reset-password", payload);
  return response.data;
};

export const googleAuthService = async (
  googleToken: string,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/google", { googleToken });
  return response.data;
};
