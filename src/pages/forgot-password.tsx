"use client";

import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/auth-context";
import ServicesNavbar from "@/components/services-navbar";

type Step = "email" | "otp" | "password";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, verifyOtpAndResetPassword } = useAuth();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await forgotPassword(email.trim());
      setMessage("OTP sent to your email. Please check your inbox.");
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    setError("");
    setStep("password");
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await verifyOtpAndResetPassword(email, otp, newPassword);
      setMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/admin/ash/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ServicesNavbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Main Card */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              ASH <span className="text-accent">Translation</span> Admin Portal
            </p>
          </div>

          {/* Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg text-sm font-medium"
            >
              {message}
            </motion.div>
          )}

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  OTP Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  className="px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                Continue
              </Button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  New Password
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          {/* Footer */}
          <div className="text-center mt-8">
            <Link
              to="/admin/ash/login"
              className="text-accent hover:text-accent/80 text-sm font-medium"
            >
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
