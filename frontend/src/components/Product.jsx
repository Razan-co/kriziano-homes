// Product.jsx
import React, { useEffect } from "react";
import "../css/Product.css";
import { FaStar, FaArrowRight, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../store/categoryStore";

export default function Product() {
  const navigate = useNavigate();
  const { category, products, isLoading, setCategory } = useCategoryStore();

  useEffect(() => {
    let storedCategory = category;
    if (!storedCategory) {
      storedCategory = sessionStorage.getItem("selectedCategory");
    }
    if (storedCategory) {
      setCategory(storedCategory);
    } else {
      const defaultCategory = "Furniture";
      sessionStorage.setItem("selectedCategory", defaultCategory);
      setCategory(defaultCategory);
    }
  }, []);

  useEffect(() => {
    if (category) {
      sessionStorage.setItem("selectedCategory", category);
    }
  }, [category]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="category-products-container">
      <div className="category-products-header">
        <span className="back-button" onClick={() => navigate(-1)}>
          <FaChevronLeft size={20} />
        </span>
        <h2 className="category-title">{category || "Products"}</h2>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p className="empty-message">No products available.</p>
        ) : (
          products.map((product, index) => (
            <div className="product-card-modern" key={index}>
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
                <div className="rating-top-left">
                  <FaStar className="star-icon" />
                  {product.rating}
                </div>
                <div className="badge">{product.badge}</div>
              </div>
              <div className="info">
                <h4>{product.name}</h4>
                <p className="category">{product.category}</p>
                <div className="bottom-row">
                  <span className="price">{product.price}</span>
                  <button
                    className="arrow"
                    onClick={() =>
                      navigate(`/product-details/${product.name}`, {
                        state: { product },
                      })
                     
                    }
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
