import React from 'react';
import '../css/Delivery.css';

const Delivered = () => {
  const orders = [
    {
      id: '238562312',
      date: '20/03/2020',
      amount: '₹50000',
      status: 'Delivered',
    },
    {
      id: '238562312',
      date: '20/03/2020',
      quantity: '01',
      amount: '₹50000',
      status: 'Delivered',
    },
  ];

  return (
    <div className="screen">
      <header className="header">
        <button className="back-button">&lt;</button>
        <h1 className="title">My Orders</h1>
      </header>

      <div className="tabs">
        <span className="tab active">Delivered</span>
        <span className="tab">Processing</span>
        <span className="tab">Canceled</span>
      </div>

      <div className="orders">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <span className="order-id">Order ID : {order.id}</span>
              <span className="order-date">{order.date}</span>
            </div>

            {order.quantity && (
              <div className="order-quantity">
                Quantity: <span>{order.quantity}</span>
              </div>
            )}

            <div className="order-footer">
              <div className="order-amount">
                Total Amount: <strong>{order.amount}</strong>
              </div>
              <div className="order-bottom">
                <button className="detail-button">Detail</button>
                <span className="order-status">{order.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delivered;