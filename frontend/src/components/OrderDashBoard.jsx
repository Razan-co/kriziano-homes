// src/pages/OrdersDashboard.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAdminStore from "../store/useAdminStore";
import AdminSidebar from "../components/AdminSidebar";

const statusColors = {
  Delivered: "text-green-600",
  Pending: "text-yellow-500",
  Cancelled: "text-red-500",
};

export default function OrdersDashboard() {
  const { status } = useParams();
  const {
    orders,
    fetchOrders,
    fetchDeliveredOrders,
    fetchPendingOrders,
    fetchCancelledOrders,
  } = useAdminStore();

  useEffect(() => {
    if (!status) fetchOrders();
    else if (status === "delivered") fetchDeliveredOrders();
    else if (status === "pending") fetchPendingOrders();
    else if (status === "cancelled") fetchCancelledOrders();
  }, [
    status,
    fetchOrders,
    fetchDeliveredOrders,
    fetchPendingOrders,
    fetchCancelledOrders,
  ]);

  const pageTitle = !status
    ? "All Orders"
    : `${status.charAt(0).toUpperCase() + status.slice(1)} Orders`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 pt-20 md:pt-6">
        {/* 🔹 pt-20 makes space for mobile burger bar */}
        <h2 className="text-xl font-semibold mb-4">{pageTitle}</h2>

        {/* Desktop / Tablet View (Table) */}
        <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{order.product}</td>
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{order.customer?.name}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        statusColors[order.status] || ""
                      }`}
                    >
                      ● {order.status}
                    </td>
                    <td className="px-4 py-3">{order.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No {pageTitle} Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Cards) */}
        <div className="sm:hidden space-y-4">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow p-4 space-y-2 border border-gray-100"
              >
                <p className="text-sm">
                  <span className="font-semibold">Product: </span>
                  {order.product}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Order ID: </span>
                  {order.id}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date: </span>
                  {order.date}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Customer: </span>
                  {order.customer?.name}
                </p>
                <p
                  className={`text-sm font-medium ${
                    statusColors[order.status] || ""
                  }`}
                >
                  ● {order.status}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Amount: </span>
                  {order.amount}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No {pageTitle} Found</p>
          )}
        </div>
      </main>
    </div>
  );
}
