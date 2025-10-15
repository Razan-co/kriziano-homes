import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import useCartStore from "../store/cartStore";
import "../css/Cart.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Cart = () => {
  const {
    cartItems,
    selectedItems,
    toggleItem,
    fetchCart,
    isLoading,
    removeCart,
    addToCart,
  } = useCartStore();
  const { user } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Rehydrate Zustand state from localStorage on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Count only selected, non-null items for UI
  const selectedCount = selectedItems.length;

  // Compute total for selected cart items (using consistent _id key)
  const totalAmount = cartItems
    .filter((item) => selectedItems.includes(item._id))
    .reduce((acc, item) => acc + item.price, 0);

  // Handler to add product (example)
  // const handleAddToCart = (product) => {
  //   addToCart(product);
  //   navigate("/cart");
  // };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaChevronLeft size={20} />
        </span>
        <h2>Cart</h2>
      </div>

      {cartItems && cartItems.length < 1 ? (
        <p>Cart is empty...</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            const isSelected = selectedItems.includes(item._id);
            return (
              <div
                className={`cart-item ${isSelected ? "selected" : ""}`}
                key={item._id}
              >
                <img src={item.image_url} alt={item.name} className="item-image" />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-category">{item.category}</div>
                  <div className="item-pricing">
                    ₹{item.price}
                    {item.originalPrice && (
                      <span className="item-original-price">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    className="add-btn"
                    onClick={() => toggleItem(item._id)}
                  >
                    {isSelected ? "✓" : "+"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => removeCart(item._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartItems && cartItems.length > 0 ? (
        <button className="continue-btn" onClick={() => setShowModal(true)}>
          Continue
        </button>
      ) : (
        <button className="continue-btn" onClick={() => navigate("/")}>
          Add product to cart
        </button>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div className="checkout-modal">
          <div className="checkout-box">
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <p className="checkout-total">
              <strong>Total</strong>{" "}
              <span className="checkout-count">({selectedCount} items)</span>
              <span className="checkout-price">₹ {totalAmount}</span>
            </p>
            <Link to={user ? "/checkout" : "/login"} className="checkout-confirm-btn">
              Continue to Check Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
