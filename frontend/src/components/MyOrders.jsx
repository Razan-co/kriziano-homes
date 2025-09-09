import React, { useState } from 'react';
import '../css/MyOrders.css'; // Assuming you have a CSS file for styling  
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ordersData = {
  Delivered: [
    {
      id: '238562312',
      date: '20/03/2020',
      amount: '₹50000',
      quantity: '01',
      status: 'Delivered',
    },
  ],
  Processing: [
    {
      id: '394758394',
      date: '10/06/2021',
      amount: '₹15000',
      quantity: '02',
      status: 'Processing',
    },
  ],
  Canceled: [
    {
      id: '129384712',
      date: '02/02/2023',
      amount: '₹8000',
      quantity: '01',
      status: 'Canceled',
    },
  ],
};

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('Delivered');
    const navigate = useNavigate();

  return (
    <div className="orders-container">
      <div className="orders-header">
         <span className="back-arrow" onClick={() => navigate(-1)}>
                 <FaChevronLeft size={20} />
               </span>
        <h2>My Orders</h2>
      </div>

      <div className="orders-tabs">
        {['Delivered', 'Processing', 'Canceled'].map((tab) => (
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
        {ordersData[activeTab].map((order, idx) => (
          <div className="order-card" key={idx}>
            <div className="order-top">
              <span className="order-id"><strong>Order ID :</strong> {order.id}</span>
              <span className="order-date">{order.date}</span>
            </div>
            <div className="order-bottom">
              <div className="order-info">
                <p><strong>Total Amount:</strong> {order.amount}</p>
                {order.quantity && <p><strong>Quantity:</strong> {order.quantity}</p>}
              </div>
              <div className="order-actions">
                <button className="detail-btn">Detail</button>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
