"use client";
import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/auth-context";
import ServicesNavbar from "@/components/services-navbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password.trim());
      navigate("/admin/ash/requests");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ServicesNavbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Decorative Background */}
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

        {/* Card */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              ASH <span className="text-accent">Translation</span>
            </h1>
            <p className="text-muted-foreground">Admin Portal</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center mt-6">
              <Link
                to="/admin/ash/forgot-password"
                className="text-accent hover:text-accent/80 text-sm font-medium"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
