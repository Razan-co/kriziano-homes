import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';

function PreviewAddress({
  addresses,
  onContinue,
  isLoading,
  addAddress,
  selectedAddress,
  setSelectedAddress,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    house_no: '',
    city: '',
    pincode: '',
    country: '',
    district: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, phone, house_no, city, pincode, country, district } = formData;
    if (!fullName || !address || !phone || !city || !country || !district || !house_no || !pincode) {
      alert('Please fill all fields');
      return
    }
        await addAddress(formData)
      setShowForm(false);
      setEditId(null);
      setFormData({
        fullName: '',
        address: '',
        phone: '',
        house_no: '',
        city: '',
        pincode: '',
        country: '',
        district: '',
      })
  };

  return (
    <div className="checkoutAddress-container">
      <div className="checkoutAddress-add" onClick={() => setShowForm(!showForm)}>
        <span>+ Add Address</span>
      </div>

      {showForm && (
        <form className="checkoutAddress-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="house_no"
            placeholder="House No"
            value={formData.house_no}
            onChange={(e) => setFormData({ ...formData, house_no: e.target.value })}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <button type="submit" className="checkoutAddress-save-btn">
            {editId ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {isLoading
        ? 'Address is Loading'
        : (addresses && addresses.length > 0 ? (
          addresses.map((addr) => {
            const addrId = addr._id ?? addr.id;
            return (
              <div key={addrId} className="checkoutAddress-block">
                <label className="checkoutAddress-checkbox">
                  <input
                    type="radio"
                    name="address"
                    checked={
                      selectedAddress ? (selectedAddress._id ?? selectedAddress.id) === addrId : false
                    }
                    onChange={() => setSelectedAddress(addr)}
                  />
                  Use as shipping address
                </label>
                <div className="checkoutAddress-card">
                  <div className="checkoutAddress-card-header">
                    <strong>{addr.name}</strong>
                    <div className="checkoutAddress-icon-group">
                      <FaPen
                        className="checkoutAddress-edit-icon"
                        onClick={() => {
                          setEditId(addrId);
                          setFormData({
                            name: addr.name ?? '',
                            address: addr.address ?? '',
                            phone: addr.phone ?? '',
                            house_no: addr.house_no ?? '',
                            city: addr.city ?? '',
                            pincode: addr.pincode ?? '',
                            country: addr.country ?? '',
                            district: addr.district ?? '',
                          });
                          setShowForm(true);
                        }}
                      />
                      {/* If you have deleteAddress, call it here */}
                      <FaTrash
                        className="checkoutAddress-delete-icon"
                        onClick={() => alert('Hook deleteAddress action here')}
                      />
                    </div>
                  </div>
                  <p>{addr.address}</p>
                  <p>{addr.phone}</p>
                </div>
              </div>
            );
          })
        ) : (
          'No address Available'
        ))}

      <button
        className="checkoutAddress-continue-btn"
        onClick={() => onContinue(selectedAddress)}
      >
        Continue to Order
      </button>
    </div>
  );
}


export default PreviewAddress