import React, { useState, useEffect } from 'react';
import '../css/MyOrders.css'; // Assuming you have a CSS file for styling  
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/orderStore'; // import your order store

const statusTabs = ['Delivered', 'Processing', 'Canceled'];

const statusColors = {
  Delivered: 'delivered',
  Processing: 'processing',
  Canceled: 'canceled',
};

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('Delivered');
  const navigate = useNavigate();

  // Destructure order state and actions from zustand store
  const { orders, fetchOrdersByStatus, isLoading } = useOrderStore();

  // Fetch orders of the active tab status on tab change and on mount
  useEffect(() => {
    if(activeTab==='Processing')
      fetchOrdersByStatus("confirmed")
    else fetchOrdersByStatus(activeTab.toLowerCase())
  }, [activeTab, fetchOrdersByStatus]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaChevronLeft size={20} />
        </span>
        <h2>My Orders</h2>
      </div>

      <div className="orders-tabs">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="orders-list">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-top">
                <span className="order-id">
                  <strong>Order ID :</strong> {order._id}
                </span>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="order-bottom">
                <div className="order-info">
                  <p>
                    <strong>Total Amount:</strong> ₹{order.total.toFixed(2)}
                  </p>
                  {order.items && order.items.length > 0 && (
                    <p>
                      <strong>Quantity:</strong>{' '}
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                  )}
                </div>
                <div className="order-actions">
                  <button className="detail-btn">Detail</button>
                  <span className={`status ${statusColors[order.status] || ''}`}>{order.status}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}
