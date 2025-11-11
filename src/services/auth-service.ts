import { apiClient } from "../api/client";
import type {
  LoginDto,
  ForgotPasswordDto,
  VerifyOtpResetPasswordDto,
  TokenResponseDto,
  GeneralResponse,
} from "../types/index";

export const authService = {
  async login(credentials: LoginDto): Promise<TokenResponseDto> {
    const response = await apiClient.post<GeneralResponse<TokenResponseDto>>(
      "/api/account/login",
      credentials
    );
    if (response.isSuccess) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data;
    }
    throw new Error(response.message);
  },

  async forgotPassword(data: ForgotPasswordDto): Promise<void> {
    const response = await apiClient.post<GeneralResponse>(
      "/api/account/forgot-password",
      data
    );
    if (!response.isSuccess) {
      throw new Error(response.message);
    }
  },

  async verifyOtpAndReset(data: VerifyOtpResetPasswordDto): Promise<void> {
    const response = await apiClient.post<GeneralResponse>(
      "/api/account/verify-otp-reset-password",
      data
    );
    if (!response.isSuccess) {
      throw new Error(response.message);
    }
  },

  logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  getToken(): string | null {
    return localStorage.getItem("accessToken");
  },
};
