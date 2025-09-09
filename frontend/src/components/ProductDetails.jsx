import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaStar,
  FaHeart,
  FaArrowRight
} from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "../css/productdetails.css";
import { useCategoryStore } from "../store/categoryStore";

function ProductDetails() {

  const { addToCart ,removeCart,cartItems} = useCartStore();
  const {  getSingleProduct, product } = useCategoryStore();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = product || location.state?.product;
  const [isFavorited, setIsFavorited] = useState(false);
   const { id } = useParams()
  

  const isInCart = Array.isArray(cartItems) && cartItems.some(item => item._id && item._id == id)
 const currentProductId = "64af3c8e29b4"; 


 
  useEffect(() => {
    getSingleProduct(id)
  }, [id, getSingleProduct])

  if (!selectedProduct) {
    return (
      <div className="error-msg">
        No product selected. Please go back and choose a product to view details.
        <button onClick={() => navigate(-1)} style={{ marginTop: "16px" }}>
          Back
        </button>
      </div>
    );
  }

  const reviews = [
    {
      name: "Cameron Williamson",
      rating: 4.8,
      time: "2 mins ago",
      comment: "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  const similarProducts = [
    {
      name: "Set of stand With Plants bot",
      category: "Decor",
      price: "₹ 185",
      rating: 4.8,
      discount: "-18%",
      img: selectedProduct.image
    },
    {
      name: "BriarWood Decorative Chair",
      category: "Furniture",
      price: "₹ 185",
      rating: 4.8,
      discount: null,
      img: selectedProduct.image
    }
  ];

  const handleAddToCart = () => {
    addToCart(selectedProduct)
    navigate("/cart")
  };
  const handleRemoveCart = () => {
    removeCart(id)
  }

  return (
    <div className="full-product-container">
      <span className="back-arrow" onClick={() => navigate(-1)}>
        <FaChevronLeft size={16} />
      </span>

      <div className="main-top">
        <div className="left">
          <div className="image-section">
            <img src={selectedProduct.image_url} alt={selectedProduct.name} className="product-image" />
            <button className="wishlist-btn" onClick={() => {setIsFavorited((prev) => !prev);}}>
              <FaHeart style={{ color: isFavorited ? "red" : "#ccc" }} />
            </button>
          </div>

{
  isInCart?(<button className="add-to-cart " style={{backgroundColor:'red'}} onClick={handleRemoveCart}>
            Remove from cart
          </button>)
  :
  (<button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>)
}
          

          <div className="similar-products">
            <h3>View Similar Products</h3>
            {similarProducts.map((prod, idx) => (
              <div className="similar-card" key={idx}>
                <img src={prod.img} alt={prod.name} className="similar-img" />
                {prod.discount && <span className="discount">{prod.discount}</span>}
                <div className="similar-content">
                  <h4>{prod.name}</h4>
                  <p>{prod.category}</p>
                  <p>{prod.price}</p>
                  <div className="arrow-btn">
                    <FaArrowRight />
                  </div>
                </div>
                <div className="similar-rating">⭐ {prod.rating}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="right">
          <h2 className="product-title">{selectedProduct.name}</h2>
          <div className="price">
            <span className="current-price">{selectedProduct.price}</span>
            <span className="old-price">{selectedProduct.originalPrice || ""}</span>
            <span className="rating">
              <FaStar className="star" /> {selectedProduct.rating || "4.5"} ({selectedProduct.reviewCount || "0"} reviews)
            </span>
          </div>

          <div className="colour-picker">
            <h4>Colour</h4>
            <div className="colour-options">
              {selectedProduct.colors?.map((clr, i) => (
                <span key={i} className={`colour ${clr}`}></span>
              ))}
            </div>
          </div>

          <div className="description">
            <h4>Description</h4>
            <p>{selectedProduct.description || "No description available."}</p>
          </div>

          <div className="reviews">
            <h4>Ratings & Review</h4>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="review-item">
                <img src={reviews[0].image} alt={reviews[0].name} className="review-img" />
                <div className="review-content">
                  <h5>{reviews[0].name} <span className="review-stars">(★{reviews[0].rating})</span></h5>
                  <p>{reviews[0].time}</p>
                  <p>{reviews[0].comment}</p>
                </div>
              </div>
            ))}
            <p className="read-all">Read all reviews →</p>

            <div className="rate-box">
              <p>How do you rate this product?</p>
              <div className="star-feedback">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="star-empty" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
