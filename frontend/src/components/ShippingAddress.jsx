import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShippingAddress.css';
import { useShippingStore } from '../store/shippingStore';


export default function ShippingAddress() {
  const navigate = useNavigate();
  const {
    addresses,
    selectedIndex,
    selectAddress,
    deleteAddress,
    editAddress
  } = useShippingStore();

  const [isEditingIndex, setIsEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const startEdit = (index) => {
    setIsEditingIndex(index);
    setEditFormData(addresses[index]);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    editAddress(isEditingIndex, editFormData);
    setIsEditingIndex(null);
  };

  return (
    <div className="shipping-container">
      <h2>Shipping Address</h2>
      <button className="add-address-btn" onClick={() => navigate('/address')}>
        + Add Address
      </button>

      {addresses.length === 0 && <p>No address found.</p>}

      {addresses.map((address, index) => (
        <div key={index} className="address-block">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedIndex === index}
              onChange={() => selectAddress(index)}
            />
            Use as the shipping address
          </label>

          {isEditingIndex === index ? (
            <div className="address-card">
              <input name="name" value={editFormData.name} onChange={handleEditChange} />
              <input name="address" value={editFormData.address} onChange={handleEditChange} />
              <input name="city" value={editFormData.city} onChange={handleEditChange} />
              <input name="district" value={editFormData.district} onChange={handleEditChange} />
              <input name="country" value={editFormData.country} onChange={handleEditChange} />
              <input name="pincode" value={editFormData.pincode} onChange={handleEditChange} />
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setIsEditingIndex(null)}>Cancel</button>
            </div>
          ) : (
            <div className="address-card">
              <div className="card-header">
                <strong>{address.name}</strong>
                <div>
                  <span className="edit-icon" onClick={() => startEdit(index)}>✎</span>
                  <span className="delete-icon" onClick={() => deleteAddress(index)}>🗑️</span>
                </div>
              </div>
              <p>{address.address}</p>
              <p>{address.city}, {address.district}, {address.country} - {address.pincode}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
