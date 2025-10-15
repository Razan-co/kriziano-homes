import { useEffect, useOptimistic, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';
import useOrderStore from "../store/orderStore";

function OrderDetails({ loading, items, selectedAddress, handleRemoveItem ,setActiveTab}) {
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');
  const navigate = useNavigate();
  const {createOrder,isLoading,order,createdOrder}=useOrderStore()

  if (loading || !items) return <p className="loading-text">Loading order details...</p>;

  const totalAmount = items.reduce((sum, it) => sum + (Number(it.price) || 0), 0);
console.log(selectedAddress)
  let products=[]
  const handlePlaceOrder = () => {
    if (paymentMode === 'COD') {
      setShowPopup(true)
      
    } else if (paymentMode === 'Other') {
      createOrder(products,selectedAddress._id)
    }
  };

//   useEffect(()=>{

//   },[order])

  

  return (
    <div className="order-container">
      <div className="order-content">
        <div className="order-left">
          {items.map((item) => {
            const id = item._id ?? item.id;
            products.push({productId:item._id,quantity:1})
            return (
              <div key={id} className="order-item">
                <FaTrash className="delete-icon-corner" onClick={() => handleRemoveItem(id)} />
                <img src={item.image_url || item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p className="category">{item.category}</p>
                  <p className="price">₹{item.price}</p>
                </div>
              </div>
            );
          })}

          <div className="order-summary">
            <div className="order-id">
              {/* If you have order id/date, show them; keeping placeholders otherwise */}
              <span>Order ID : —</span>
              <span>—</span>
            </div>
            <div className="total-amount-box">
              <p className="total-amount">
                Total Amount: <strong>₹{totalAmount}</strong>
              </p>
              <button
                className={`place-order-btn ${paymentMode === 'COD' ? 'active' : paymentMode === 'Other' ? 'redirect' : ''
                  }`}
                onClick={selectedAddress?handlePlaceOrder:()=>setActiveTab("preview")}
                disabled={isLoading}
              >
                {selectedAddress?(paymentMode === 'COD'
                  ? 'Place Order'
                  : paymentMode === 'Other'
                    ? 'Proceed to Payment'
                    : 'Select Payment Mode'):"Select your address"}
              </button>
            </div>

            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <p>Your order is placed successfully!</p>
                  <button className="popup-close-btn" onClick={() => setShowPopup(false)}>
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="order-right">
          <div className="shipment-section">
            <h4>Shipment Details</h4>
            <div className="shipment-box">
              <p className="status">Pending</p>
              <p className="shipment-date">
                —
                <FaArrowRight className="arrow-icon" />
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-section">
            <h4>Payment Method</h4>
            <div className="payment-box">
              <p className="label">Select Payment Mode:</p>
              <div className="radio-group vertical">
                {/* <label>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMode === 'COD'}
                    onChange={() => setPaymentMode('COD')}
                  />
                  Cash on Delivery (COD)
                </label> */}
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Other"
                    checked={paymentMode === 'Other'}
                    onChange={() => setPaymentMode('Other')}
                  />
                  Other Payment Methods
                </label>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="address-section">
            <h4>Shipping Address</h4>
            <div className="address-box">
              <p className="name">{selectedAddress?.name ?? '—'}</p>
              <p>{selectedAddress?.address ?? '—'}</p>
              <p>{selectedAddress?.phone ?? '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails