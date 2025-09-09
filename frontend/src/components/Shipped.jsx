import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import '../css/Shipped.css'; // CSS file for styling

export default function Shipped() {
  return (
    <div className="shipping-page">
      <div className="header">
        <FaChevronLeft className="back-icon" />
        <h2>Shipping Address</h2>
      </div>

      <div className="content">
        <img
          src="https://www.svgrepo.com/show/521377/review-rating-feedback.svg" // you can replace with your custom image or local asset
          alt="No reviews"
          className="illustration"
        />
        <h3>No reviews yet</h3>
        <p>Ullamco tempor adipisicing et voluptate duis sit esse aliqua esse ex.</p>
      </div>
    </div>
  );
}