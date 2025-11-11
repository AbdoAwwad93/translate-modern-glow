import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import ServiceRequestPage from "./pages/GetQuote";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import ProtectedRoute from "./components/protected-route";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import Requests from "./pages/orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/admin/ash/login" element={<Login />} />
            <Route
              path="/admin/ash/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/admin/ash/requests"
              element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Index />} />
            <Route path="/GetQuote" element={<ServiceRequestPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
