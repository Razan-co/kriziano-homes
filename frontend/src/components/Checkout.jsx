import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/Checkout.css';
import useOrderStore from '../store/orderStore';
import useCartStore from '../store/cartStore';
import PreviewAddress from '../sub-components/PreviewAddress';
import OrderDetails from '../sub-components/OrderDeails';

export default function Checkout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('order') // 'address' | 'preview' | 'order'
  const { getAddress, addAddress, addresses, isLoading } = useOrderStore();
  const { selectedItems, cartItems } = useCartStore();

  // ordered products from cart (normalize _id/id just in case)

  // local UI state for items shown on this page (so Remove works visually)
  const [displayItems, setDisplayItems] = useState(null);
  useEffect(() => {
    const orderedProducts = cartItems.filter((c) =>
      selectedItems.includes(c._id ?? c.id)
    )
    if (orderedProducts) {
      setDisplayItems(orderedProducts);
    }
  }, []);


  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  // Remove item only from the page view; plug into cart store if you have an action
  const handleRemoveItem = (id) => {
    setDisplayItems((prev) => {
      const updated = prev.filter((i) => (i._id ?? i.id) !== id);
      if (updated.length === 0) navigate('/');
      return updated;
    });
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
        <h2 className="checkout-title">Checkout</h2>
      </div>

      {/* Tabs */}
      <div className="checkout-tabs">
        <span
          className={`tab ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => setActiveTab('order')}
        >
          Order Details
        </span>
        <span
          className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview Address
        </span>
      </div>

      {/* Preview Address */}
      {activeTab === 'preview' && (
        <PreviewAddress
          addresses={addresses}
          addAddress={addAddress}
          isLoading={isLoading}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          onContinue={(selected) => {
            if (!selected) {
              alert('Please select an address');
              return;
            }
            setSelectedAddress(selected);
            setActiveTab('order');
          }}
        />
      )}

      {/* Order Details */}
      {activeTab === 'order' && (
        <OrderDetails
          loading={false}
          items={displayItems}
          selectedAddress={selectedAddress}
          handleRemoveItem={handleRemoveItem}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}

/* ---------------- PREVIEW ADDRESS COMPONENT ---------------- */


/* ---------------- ORDER DETAILS COMPONENT ---------------- */





// import React, { useState, useEffect } from 'react';
// import { FaArrowLeft, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import '../css/Checkout.css';
// import useOrderStore from '../store/orderStore';
// import useCartStore from '../store/cartStore';
// // import '../css/CheckoutAddress.css';

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('order'); // 'address' | 'preview' | 'order'
//   const { getAddress, addAddress, addresses, isLoading } = useOrderStore()
//   const { selectedItems,cartItems} = useCartStore()

//   //ordered products
//   const orderedProducts=cartItems.filter(c=>selectedItems.includes(c._id))

//   useEffect(() => {
//     getAddress()
//   }, [])

//   // Form States
//   const [fullName, setFullName] = useState('');
//   const [city, setCity] = useState('');
//   const [address, setAddress] = useState('');
//   const [district, setDistrict] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [country, setCountry] = useState('');
//   const [phone, setPhone] = useState('');

//   // Address & Order States
//   const [submittedAddress, setSubmittedAddress] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   // const [addresses, setAddresses] = useState([
//   //   {
//   //     id: 1,
//   //     name: 'Rumaira Mohamed',
//   //     address: '25 Sivagami Puram, Becent nagr depot, Adayar, Chennai - 6000011',
//   //     phone: '9584738906',
//   //     isSelected: true,
//   //   },
//   // ]);


//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Reset Address Form whenever user navigates to Address tab
//   useEffect(() => {
//     if (activeTab === 'address') {
//       setFullName('');
//       setCity('');
//       setAddress('');
//       setDistrict('');
//       setPincode('');
//       setCountry('');
//       setPhone('');
//     }
//   }, [activeTab]);

//   // Fetch Order Details
//   useEffect(() => {
//     setTimeout(() => {
//       const initialItems = [
//         { id: 1, name: 'BriarWood Decorative Chair', category: 'Furniture', price: 1085, image: '/assets/chair1.jpg' },
//         { id: 2, name: 'Classic Wooden Chair', category: 'Furniture', price: 1085, image: '/assets/chair2.jpg' },
//         { id: 3, name: 'Luxury Lamp', category: 'Lighting', price: 1085, image: '/assets/lamp.jpg' },
//       ];

//       setOrder({
//         id: '238562312',
//         date: '20/03/2025',
//         totalAmount: initialItems.reduce((acc, item) => acc + item.price, 0),
//         items: initialItems,
//         shipmentStatus: 'Delivered',
//         shipmentDate: 'Saturday, 14 September, 2025',
//         paymentMode: '',
//         shippingAddress: {
//           name: 'Rumaira Mohamed',
//           address: '25 Sivagami Puram, Becent nagr depot, Adayar, Chennai - 6000011',
//           phone: '9584738906',
//         },
//       });
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Sync Selected Address with Order Details
//   useEffect(() => {
//     if (order && selectedAddress) {
//       setOrder((prev) => ({
//         ...prev,
//         shippingAddress: selectedAddress,
//       }))
//     }
//   }, [selectedAddress])

//   // Handle Item Removal
//   const handleRemoveItem = (id) => {
//     if (!window.confirm('Are you sure you want to remove this item?')) return;

//     setOrder((prev) => {
//       const updatedItems = prev.items.filter((item) => item.id !== id);
//       if (updatedItems.length === 0) {
//         navigate('/'); // ✅ Navigate home when all items are deleted
//       }
//       return {
//         ...prev,
//         items: updatedItems,
//         totalAmount: updatedItems.reduce((acc, item) => acc + item.price, 0),
//       };
//     })
//   }

//   // Address Form Submit
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (!fullName || !city || !address || !district || !pincode || !country || !phone) {
//   //     alert('Please fill in all fields!');
//   //     return;
//   //   }
//   //   const newAddress = {
//   //     id: Date.now(),
//   //     name: fullName,
//   //     address: `${address}, ${district}, ${city}, ${pincode}, ${country}`,
//   //     phone,
//   //     isSelected: true,
//   //   };
//   //   setAddresses((prev) => [newAddress, ...prev.map((a) => ({ ...a, isSelected: false }))]);
//   //   setSubmittedAddress(newAddress);
//   //   setSelectedAddress(newAddress);
//   //   setActiveTab('preview');
//   // };

//   return (
//     <div className="checkout-page">
//       {/* Header */}
//       <div className="checkout-header">
//         <button className="back-button" onClick={() => navigate('/')}>
//           <FaArrowLeft />
//         </button>
//         <h2 className="checkout-title">Checkout</h2>
//       </div>

//       {/* Tabs */}
//       <div className="checkout-tabs">
//         <span className={`tab ${activeTab === 'order' ? 'active' : ''}`} onClick={() => setActiveTab('order')}>Order Details</span>
//         {/* <span className={`tab ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>Address</span> */}
//         <span className={`tab ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>Preview Address</span>
//       </div>

//       {/* Address Form */}
//       {/* {activeTab === 'address' && (
//         <div className="checkout-main">
//           <div className="checkout-container">
//             <form className="checkout-form" onSubmit={handleSubmit}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Full Name</label>
//                   <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" />
//                 </div>
//                 <div className="form-group">
//                   <label>City</label>
//                   <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Address</label>
//                   <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
//                 </div>
//                 <div className="form-group">
//                   <label>District</label>
//                   <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Enter your district" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Pincode</label>
//                   <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter your pincode" />
//                 </div>
//                 <div className="form-group">
//                   <label>Country</label>
//                   <select value={country} onChange={(e) => setCountry(e.target.value)}>
//                     <option value="">Select Country</option>
//                     <option>India</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Phone Number</label>
//                   <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" />
//                 </div>
//               </div>
//               <button type="submit" className="continue-btn">Save & Preview</button>
//             </form>
//           </div>
//         </div>
//       )} */}

//       {/* Preview Address */}
//       {activeTab === 'preview' && (
//         <PreviewAddress
//           addresses={addresses}
//           addAddress={addAddress}
//           isLoading={isLoading}
//           setSelectedAddress={setSelectedAddress}
//           selectedAddress={selectedAddress}
//           // setAddresses={setAddresses}
//           onContinue={(selected) => {
//             setSelectedAddress(selected);
//             setActiveTab('order');
//           }}
//         />
//       )}

//       {/* Order Details */}
//       {activeTab === 'order' && (
//         <OrderDetails loading={loading} order={orderedProducts} handleRemoveItem={handleRemoveItem} />
//       )}
//     </div>
//   );
// }

// /* ---------------- PREVIEW ADDRESS COMPONENT ---------------- */
// function PreviewAddress({ addresses,onContinue, setAddresses, isLoading, addAddress, selectedAddress, setSelectedAddress }) {
//   //const { getAddress, addAddress, addresses, isLoading } = useOrderStore()
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({ name: '', address: '', phone: '', house_no: '', city: '', pincode: '', country: '', district: '' });

//   const toggleSelection = (id) => {
//     setAddresses((prev) => prev.map((addr) => ({ ...addr, isSelected: addr.id === id })));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.address || !formData.phone || !formData.city || !formData.country || !formData.district || !formData.house_no || formData.pincode) return alert('Please fill all fields')
//     if (editId) {
//       setAddresses((prev) => prev.map((a) => (a.id === editId ? { ...a, ...formData } : a)))
//     } else {
//       // setAddresses((prev) => [{ id: Date.now(), ...formData, isSelected: false }, ...prev])
//       addAddress(form)
//     }
//     setShowForm(false)
//     setEditId(null)
//     setFormData({ name: '', address: '', phone: '', house_no: '', city: '', pincode: '', country: '', district: '' })
//   }

//   const handleDelete = (id) => {
//     setAddresses((prev) => {
//       const updated = prev.filter((addr) => addr.id !== id)
//       if (updated.length > 0 && !updated.some((a) => a.isSelected)) {
//         updated[0].isSelected = true
//       }
//       return updated;
//     })
//   }

//   return (
//     <div className="checkoutAddress-container">
//       <div className="checkoutAddress-add" onClick={() => setShowForm(!showForm)}>
//         <span>+ Add Address</span>
//       </div>

//       {showForm && (
//         <form className="checkoutAddress-form" onSubmit={handleFormSubmit}>
//           <input type="text" name='house_no' placeholder="House No" value={formData.house_no} onChange={(e) => setFormData({ ...formData, house_no: e.target.value })} />
//           <input type="text" name='fullName' placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           <input type="text" name='address' placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
//           <input type="text" name='city' placeholder="City" value={formData.address} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
//           <input type="text" name='pincode' placeholder="Pincode" value={formData.address} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
//           <input type="text" name='country' placeholder="Country" value={formData.address} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
//           <input type="text" name='district' placeholder="District" value={formData.address} onChange={(e) => setFormData({ ...formData, district: e.target.value })} />
//           <input type="text" name='phone' placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
//           <button type="submit" className="checkoutAddress-save-btn">{editId ? 'Update' : 'Save'}</button>
//         </form>
//       )}

//       {
//         isLoading ?
//           "Address is Loading" :
//           (addresses && addresses.length > 0 ?
//             addresses.map((addr) => (
//               <div key={addr.id} className="checkoutAddress-block">
//                 <label className="checkoutAddress-checkbox">
//                   <input
//                     type="radio"
//                     name="address"
//                     checked={addr._id == selectedAddress._id}
//                     onChange={() => toggleSelection(addr._id)}
//                   />
//                   Use as shipping address
//                 </label>
//                 <div className="checkoutAddress-card">
//                   <div className="checkoutAddress-card-header">
//                     <strong>{addr.name}</strong>
//                     <div className="checkoutAddress-icon-group">
//                       <FaPen className="checkoutAddress-edit-icon" onClick={() => { setEditId(addr.id); setFormData(addr); setShowForm(true); }} />
//                       <FaTrash className="checkoutAddress-delete-icon" onClick={() => handleDelete(addr.id)} />
//                     </div>
//                   </div>
//                   <p>{addr.address}</p>
//                   <p>{addr.phone}</p>
//                 </div>
//               </div>
//             )) : "No address Availible")
//       }

//       <button className="checkoutAddress-continue-btn" onClick={() => onContinue(addresses.find((a) => a.isSelected))}>
//         Continue to Order
//       </button>
//     </div>
//   );
// }

// /* ---------------- ORDER DETAILS COMPONENT ---------------- */
// function OrderDetails({ loading, order, handleRemoveItem }) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [paymentMode, setPaymentMode] = useState('');

//   const navigate = useNavigate();

//   if (loading || !order) return <p className="loading-text">Loading order details...</p>;

//   const handlePlaceOrder = () => {
//     if (paymentMode === 'COD') {
//       setShowPopup(true);
//     } else if (paymentMode === 'Other') {
//       navigate('/payment'); // ✅ Redirect to payment page
//     }
//   };

//   return (
//     <div className="order-container">
//       <div className="order-content">
//         <div className="order-left">
//           {order.map((item) => (
//             <div key={item._id} className="order-item">
//               <FaTrash className="delete-icon-corner" onClick={() => handleRemoveItem(item.id)} />
//               <img src={item.image_url  } alt={item.name} className="order-item-image" />
//               <div className="order-item-details">
//                 <h3>{item.name}</h3>
//                 <p className="category">{item.category}</p>
//                 <p className="price">₹{item.price}</p>
//               </div>
//             </div>
//           ))}
//           <div className="order-summary">
//             <div className="order-id">
//               <span>Order ID : {order.id}</span>
//               <span>{order.date}</span>
//             </div>
//             <div className="total-amount-box">
//               <p className="total-amount">
//                 Total Amount: <strong>₹{order.totalAmount}</strong>
//               </p>
//               <button
//                 className={`place-order-btn ${paymentMode === 'COD' ? 'active' : paymentMode === 'Other' ? 'redirect' : ''}`}
//                 onClick={handlePlaceOrder}
//                 disabled={!paymentMode}  // ✅ Disabled until payment selected
//               >
//                 {paymentMode === 'COD' ? 'Place Order' : paymentMode === 'Other' ? 'Proceed to Payment' : 'Select Payment Mode'}
//               </button>
//             </div>
//             {showPopup && (
//               <div className="popup-overlay">
//                 <div className="popup-box">
//                   <p>Your order is placed successfully!</p>
//                   <button className="popup-close-btn" onClick={() => setShowPopup(false)}>OK</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="order-right">
//           <div className="shipment-section">
//             <h4>Shipment Details</h4>
//             <div className="shipment-box">
//               <p className="status">{order.shipmentStatus}</p>
//               <p className="shipment-date">{order.shipmentDate} <FaArrowRight className="arrow-icon" /></p>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="payment-section">
//             <h4>Payment Method</h4>
//             <div className="payment-box">
//               <p className="label">Select Payment Mode:</p>
//               <div className="radio-group vertical">
//                 <label>
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="COD"
//                     checked={paymentMode === 'COD'}
//                     onChange={() => setPaymentMode('COD')}
//                   />
//                   Cash on Delivery (COD)
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="Other"
//                     checked={paymentMode === 'Other'}
//                     onChange={() => setPaymentMode('Other')}
//                   />
//                   Other Payment Methods
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Address */}
//           <div className="address-section">
//             <h4>Shipping Address</h4>
//             <div className="address-box">
//               <p className="name">{order?order.shippingAddress.name:"name"}</p>
//               <p>{order.shippingAddress.address||"address"}</p>
//               <p>{order.shippingAddress.phone||"address"}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }