import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../css/OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();

  // ✅ Automatically redirect after a delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect to homepage after 5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-success-container">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p className="success-message">
          Thank you for shopping with us. Your order has been successfully placed and will be processed soon.
        </p>

        <div className="order-info">
          <p><strong>Order ID:</strong> #{Math.floor(Math.random() * 1000000)}</p>
          <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
        </div>

        <button className="continue-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
