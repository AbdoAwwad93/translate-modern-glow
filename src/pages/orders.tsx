"use client";

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";
import { orderService } from "../services/order-service";
import type { Order } from "../types/index";
import OrdersTable from "../components/orders-table";
import ServicesNavbar from "../components/services-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RefreshCw,
  LogOut,
  AlertCircle,
  FileText,
  Clock,
  CheckCircle2,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { isPast } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to load orders";
      setError(errorMessage);
      toast({
        title: "Error loading orders",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(
        orderId,
        newStatus
      );
      setOrders(orders.map((o) => (o.id === orderId ? updatedOrder : o)));
      setError("");
      toast({
        title: "Status updated",
        description: `Order #${orderId} status changed to ${newStatus}`,
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update order status";
      setError(errorMessage);
      toast({
        title: "Error updating status",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/ash/login");
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.orderStatus === "Pending").length;
    const workingOn = orders.filter((o) => o.orderStatus === "WorkingON").length;
    const done = orders.filter((o) => o.orderStatus === "Done").length;
    
    const overdue = orders.filter((o) => {
      if (!o.deadLine) return false;
      return isPast(new Date(o.deadLine)) && o.orderStatus !== "Done";
    }).length;

    return {
      total,
      pending,
      workingOn,
      done,
      overdue,
    };
  }, [orders]);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    className = "",
    trend,
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    className?: string;
    trend?: string;
  }) => (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <ServicesNavbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative overflow-hidden pt-20">
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

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  ASH <span className="text-accent">Translation</span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Admin Dashboard - Manage and track all translation orders
                </p>
              </div>
              <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                <Button
                  onClick={fetchOrders}
                  disabled={loading}
                  variant="outline"
                  className="gap-2 flex-1 sm:flex-initial"
                  size="sm"
                >
                  <RefreshCw
                    className={`h-4 w-4 shrink-0 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="gap-2 flex-1 sm:flex-initial"
                  size="sm"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Statistics Cards */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8"
              >
                <StatCard
                  title="Total Orders"
                  value={statistics.total}
                  icon={FileText}
                  className="lg:col-span-1"
                />
                <StatCard
                  title="Pending"
                  value={statistics.pending}
                  icon={Clock}
                  className="border-amber-200 dark:border-amber-800"
                />
                <StatCard
                  title="In Progress"
                  value={statistics.workingOn}
                  icon={Loader2}
                  className="border-blue-200 dark:border-blue-800"
                />
                <StatCard
                  title="Completed"
                  value={statistics.done}
                  icon={CheckCircle2}
                  className="border-green-200 dark:border-green-800"
                />
                <StatCard
                  title="Overdue"
                  value={statistics.overdue}
                  icon={AlertCircle}
                  className="border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20"
                />
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-4 w-20" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-8 w-16" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Loading orders...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Orders Table */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <OrdersTable
                  orders={orders}
                  onStatusChange={handleStatusChange}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
