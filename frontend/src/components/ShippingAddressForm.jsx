import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import '../css/ShippingAddressForm.css';
import { useShippingStore } from '../store/shippingStore';


export default function ShippingAddressForm() {
  const navigate = useNavigate();
  const addAddress = useShippingStore((state) => state.addAddress);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    city: '',
    district: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      name: formData.fullName,
      address: formData.address,
      city: formData.city,
      district: formData.district,
      country: formData.country,
      pincode: formData.pincode
    };
    addAddress(newAddress);
    navigate('/shaddress');
  };

  return (
    <div className="shipping-form-container">
      {/* Header */}
      <div className="form-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaChevronLeft size={20} />
        </span>
        <h2>Shipping Address</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option>Chennai</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          >
            <option value="">Select District</option>
            <option>Chengalpattu</option>
            <option>Kanchipuram</option>
            <option>Coimbatore</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option>India</option>
            <option>UAE</option>
            <option>USA</option>
          </select>
        </div>

        <div className="form-submit">
          <button type="submit">Save Address</button>
        </div>
      </form>
    </div>
  );
}
