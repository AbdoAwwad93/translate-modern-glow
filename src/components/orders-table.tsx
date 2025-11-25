"use client";

import { useState } from "react";
import { Order } from "../types/index";

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: string) => void;
}

export default function OrdersTable({
  orders,
  onStatusChange,
}: OrdersTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status: string): string => {
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (status === "WorkingON")
      return "bg-blue-100 text-blue-800 border-blue-300";
    if (status === "Done")
      return "bg-green-100 text-green-800 border-green-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className="border border-border rounded-xl shadow-sm bg-muted/10 overflow-hidden"
          >
            {/* MAIN ROW */}
            <div
              className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr] items-center px-6 py-4 cursor-pointer hover:bg-muted/50 transition-colors gap-2"
              onClick={() => toggleRow(order.id)}
            >
              <span className="font-semibold text-sm">#{order.id}</span>
              <span className="text-sm">{order.customerName}</span>
              <span className="text-sm text-muted-foreground">
                {order.customerEmail}
              </span>

              {/* SELECT STATUS */}
              <select
                value={order.orderStatus}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white text-foreground border border-border text-sm font-medium hover:ring-1 hover:ring-accent focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="WorkingON">WorkingON</option>
                <option value="Done">Done</option>
              </select>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRow(order.id);
                }}
                className="text-accent font-medium text-sm hover:underline"
              >
                {expandedId === order.id ? "Hide ▲" : "View ▼"}
              </button>
            </div>

            {/* EXPANDED ROW */}
            <div
              className={`overflow-hidden transition-all duration-300 transform origin-top px-6 ${
                expandedId === order.id
                  ? "max-h-[1000px] scale-y-100 opacity-100 py-4"
                  : "max-h-0 scale-y-0 opacity-0 py-0"
              } bg-muted/20`}
            >
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </p>

                <p>
                  <strong>Phone:</strong> {order.customerPhoneNumber}
                </p>
                <p>
                  <strong>Pages:</strong> {order.pageCount}
                </p>
                <p>
                  <strong>Words:</strong> {order.wordCount}
                </p>
                <p>
                  <strong>Services:</strong> {order.services?.join(", ") || "-"}
                </p>
                <p>
                  <strong>Languages:</strong> {order.sourceLanguage ?? "-"} →{" "}
                  {order.targetLanguage ?? "-"}
                </p>
                <p>
                  <strong>Notes:</strong> {order.notes || "—"}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(order.deadLine).toLocaleDateString()}
                </p>

                <p>
                  <strong>Uploaded File:</strong>{" "}
                  {order.uploadedFilePath ? (
                    <a
                      href={`https://ash-translation-backend.up.railway.app${order.uploadedFilePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline hover:text-accent/80"
                    >
                      Download
                    </a>
                  ) : (
                    "No file uploaded"
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
