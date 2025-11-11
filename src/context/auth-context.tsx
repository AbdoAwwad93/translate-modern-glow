"use client";

import React, {
  createContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { authService } from "../services/auth-service";
import type { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authService.isAuthenticated()
  );
  const [token, setToken] = useState<string | null>(() =>
    authService.getToken()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refreshToken")
  );

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword({ email });
  }, []);

  const verifyOtpAndResetPassword = useCallback(
    async (email: string, otp: string, newPassword: string) => {
      await authService.verifyOtpAndReset({ email, otp, newPassword });
    },
    []
  );

  const value: AuthContextType = {
    isAuthenticated,
    token,
    refreshToken,
    login,
    logout,
    forgotPassword,
    verifyOtpAndResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
