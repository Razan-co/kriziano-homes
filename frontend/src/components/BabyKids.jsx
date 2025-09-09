import React from 'react';
import '../css/categories.css';
import { FaChevronLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    title: "Set of stand With Plants bot",
    price: "₹ 185",
    rating: 4.6,
    discount: "18%",
    image: "/assets/baby&kids1.jpg",
  },
  {
    title: "Set of stand With Plants bot",
    price: "₹ 185",
    rating: 4.8,
    discount: "18%",
    image: "/assets/baby&kids2.jpg",
  },
  {
    title: "Set of stand With Plants bot",
    price: "₹ 185",
    rating: 4.4,
    discount: "18%",
    image: "/assets/baby&kids3.jpg",
  },
  // Add more products as needed
];

export default function BabyKids() {
   const navigate = useNavigate();
  return (
    <div className="sofas-container">
      <div className="sofas-header">
         <span className="back-arrow" onClick={() => navigate(-1)}>
                  <FaChevronLeft size={20} />
                               </span>
        <h2>BabyKids</h2>
      </div>
      <p className="product-count">1121 products</p>

      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="image-wrapper">
              <img src={product.image} alt={product.title} />
              <span className="discount-badge">-{product.discount}</span>
              <span className="rating-badge">
                <FaStar className="star-icon" /> {product.rating}
              </span>
            </div>
            <h4 className="title">{product.title}</h4>
            <p className="category">Furniture</p>
            <div className="bottom-row">
              <span className="price">{product.price}</span>
              <FaArrowRight className="arrow-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
