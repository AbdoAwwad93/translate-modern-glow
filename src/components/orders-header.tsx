"use client";
import "./css/header.css";

interface OrdersHeaderProps {
  onLogout: () => void;
}

export default function OrdersHeader({ onLogout }: OrdersHeaderProps) {
  return (
    <header className="orders-header">
      <div className="container header-content">
        <div className="header-brand">
          <h2>ASH Translation</h2>
          <span className="badge">Admin</span>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </header>
  );
}
