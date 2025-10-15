import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/Checkout.css';
import useOrderStore from '../store/orderStore';
import useCartStore from '../store/cartStore';
import PreviewAddress from '../sub-components/PreviewAddress';
import OrderDetails from '../sub-components/OrderDeails';

export default function Checkout() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('order'); // 'order' | 'preview'
  const [displayItems, setDisplayItems] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const {
    createdOrder,
    razorpayOrderInfo,
    verifyPayment,
    resetOrderState,
    isLoading,
    getAddress,
    addAddress,
    addresses,
  } = useOrderStore();
  const { selectedItems, cartItems, clearCart } = useCartStore();

  // Dynamically load Razorpay script
  useEffect(() => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      alert('Failed to load Razorpay SDK. Payment will not work.');
      setRazorpayLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch address list on mount
  useEffect(() => {
    getAddress();
  }, [getAddress]);

  // Filter selected cart items for this order
  useEffect(() => {
    const orderedProducts = cartItems.filter((c) =>
      selectedItems.includes(c._id ?? c.id)
    );
    if (orderedProducts.length > 0) {
      setDisplayItems(orderedProducts);
    }
  }, [cartItems, selectedItems]);

  // Razorpay payment UI load when createdOrder & razorpayOrderInfo are available and SDK loaded
  useEffect(() => {
    if (createdOrder && razorpayOrderInfo && razorpayLoaded) {
      const options = {
        key: razorpayOrderInfo.key,
        amount: razorpayOrderInfo.amount,
        currency: razorpayOrderInfo.currency,
        name: 'Your Company Name',
        description: 'Order Payment',
        order_id: razorpayOrderInfo.razorpay_order_id,
        handler: function (response) {
          // Called after payment is complete
          verifyPayment(response).then(() => {
            resetOrderState();
            navigate(`/order-success/${createdOrder.orderId || createdOrder._id || createdOrder.id}`);
          });
        },
        prefill: {
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
      });
    }
  }, [createdOrder, razorpayOrderInfo, razorpayLoaded, verifyPayment, resetOrderState, navigate]);

  // Remove item visually (does not affect global cart unless added)
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

      {/* Preview Address Tab */}
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

      {/* Order Details Tab */}
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
