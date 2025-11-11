"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth-context";
import { orderService } from "../services/order-service";
import type { Order, OrderStatus } from "../types/index";
import OrdersTable from "../components/orders-table";
import ServicesNavbar from "@/components/services-navbar";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, {
        status: newStatus,
      } as any);
      setOrders(orders.map((o) => (o.id === orderId ? updatedOrder : o)));
    } catch (err: any) {
      setError(err.message || "Failed to update order status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/ash/login");
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
          className="relative z-10 w-full max-w-6xl bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                ASH <span className="text-accent">Translation</span>
              </h1>
              <p className="text-muted-foreground">Translation Requests</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg"
            >
              Logout
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Orders Section */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              Manage and track all incoming translation orders
            </p>
            <button
              onClick={fetchOrders}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg"
            >
              Refresh
            </button>
          </div>

          {/* Orders Table or Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="spinner mb-4"></div>
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : (
            <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
          )}
        </motion.div>
      </div>
    </>
  );
}
