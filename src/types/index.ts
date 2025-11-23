import { ReactNode } from "react";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface GeneralResponse<T = any> {
  isSuccess: boolean; // unified boolean
  message: string;
  data?: T;
  errors?: any;
}

export enum OrderStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  deadLine: string;
  notes: string;
  pageCount: number;
  wordCount: number;
  preferredContact: string;
  services: string[];
  sourceLanguage: string;
  targetLanguage: string;
  orderStatus: OrderStatus;
  uploadedFilePath?: string;
  createdAt?: string;

  // Remove unused or mis-typed fields:
  status?: any;
  email?: ReactNode;
  clientName?: ReactNode;
}

export interface OrderCreateDto {
  CustomerName: string;
  CustomerEmail: string;
  CustomerPhoneNumber: string;
  DeadLine: Date;
  Notes?: string;
  PageCount: number;
  WordCount?: number; // optional
  PreferredContact: string;
  Services: string[]; // required
  SourceLanguage?: string; // optional
  TargetLanguage?: string; // optional
  File?: File;
}

export interface UpdateOrderStatusDto {
  OrderStatus: OrderStatus | string; // matches backend property
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyOtpAndResetPassword: (
    email: string,
    otp: string,
    newPassword: string
  ) => Promise<void>;
}

// DTO aliases for backward compatibility
export type LoginDto = LoginCredentials;
export type TokenResponseDto = TokenResponse;
export type ForgotPasswordDto = ForgotPasswordPayload;
export type VerifyOtpResetPasswordDto = VerifyOtpPayload;
