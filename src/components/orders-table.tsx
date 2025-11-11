"use client";

import { type Order, OrderStatus } from "../types/index";
import "./css/table.css";

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: number, status: OrderStatus) => void;
}

export default function OrdersTable({
  orders,
  onStatusChange,
}: OrdersTableProps) {
  const statusColors = {
    [OrderStatus.Pending]: "#f59e0b",
    [OrderStatus.InProgress]: "#3b82f6",
    [OrderStatus.Completed]: "#10b981",
    [OrderStatus.Cancelled]: "#ef4444",
  };

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No orders yet</h3>
        <p>
          When customers submit translation requests, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper card-3d">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Languages</th>
            <th>Words</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="animate-fade-in-up">
              <td className="order-id">#{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.customerEmail}</td>
              <td className="languages">
                {order.sourceLanguage} → {order.targetLanguage}
              </td>
              <td>{order.wordCount}</td>
              <td>{new Date(order.deadLine).toLocaleDateString()}</td>
              <td>
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    onStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  className="status-select"
                  style={{ borderColor: statusColors[order.orderStatus] }}
                >
                  {Object.values(OrderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn-view" title="View details">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
