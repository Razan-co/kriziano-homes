import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../css/Homepage.css";
import { useCategoryStore } from "../store/categoryStore";

// const categories = [
//   "Furniture",
//   "Bed & Bath",
//   "Outdoor",
//   "Kitchen",
//   "Decor & Pillow",
//   "Storage",
//   "Lighting",
//   "Pet",
//   "Baby & Kids",
//   "Cloths",
//   "Deals",
// ];

export default function HomePage() {
  const navigate = useNavigate();
  const { category,categories, setCategory, products, isLoading,getCategories,getProducts } = useCategoryStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Load default category (Furniture) on first mount
  useEffect(() => {
    //setCategory(category);
    getProducts()
    getCategories()
  }, [])

  const handleCategoryClick = (cat) => {
    setSearchTerm("")
    getProducts(null,null,cat)
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }
  const handleSearchClick = (e) => {
    getProducts(null,searchTerm,null)
  }

  // const filteredProducts = Array.isArray(products)
  //   ? products.filter((item) =>
  //       item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   : [];
  const filteredProducts =products


    const bestSellerRef = useRef(null);

const scrollBestSellers = (direction) => {
  if (!bestSellerRef.current) return;
  const container = bestSellerRef.current;
  const scrollAmount = container.clientWidth; // scroll by visible width
  container.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

//console.log(categories)
//console.log("Component is rendering with these products:", products);
  return (
    <div className="homepage">
      <div className="searchbar">
        <FaSearch className="search-icon"  onClick={()=>handleSearchClick()}/>
        <input
          type="text"
          placeholder="Search for furniture"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="category-row">
        <strong>Shop by Department</strong>
      </div>

      <div className="category-buttons-grid">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={cat.category === category ? "active" : ""}
            onClick={() =>{handleCategoryClick(cat.category)}}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {searchTerm && (
        <>
          <h3>Search Results for "{searchTerm}"</h3>
          {isLoading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="scroll-cards">
  {filteredProducts.map((item, index) => (
    <Link to={`/product/details/${item._id}`} className="product-card-modern" key={index}>
      <div className="image-wrapper">
        <img src={item.image_url} alt={item.name} />
        <div className="top-tags">
          {item.badge && <span className="badge">{item.badge}</span>}
          {item.rating && (
            <span className="rating">⭐ {item.rating}</span>
          )}
        </div>
      </div>
      <div className="info">
        <h4>{item.name.length > 50 ? item.name.substring(0, 50) + '...' : item.name}</h4>
        <p className="category">{item.category}</p>
        <div className="bottom-row">
          <p className="price">{item.price}</p>
          <button className="arrow">→</button>
        </div>
      </div>
    </Link>
  ))}
</div>

          ) : (
            <p>No products match your search.</p>
          )}
        </>
      )}
{/* Category Top Selling */}
<h3>{category} Top Selling</h3>
{isLoading ? (
  <p>Loading products...</p>
) : (
  <div className="scroll-cards">
    {Array.isArray(products) && products.length > 0 ? (
      products.map((item, index) => (
        <Link to={`/product/details/${item._id}`} className="product-card-modern" key={index}>
          <div className="image-wrapper">
            <img src={item.image_url} alt={item.name} />
            <div className="top-tags">
              {item.badge && <span className="badge">{item.badge}</span>}
              {item.rating && (
                <span className="rating">⭐ {item.rating}</span>
              )}
            </div>
          </div>
          <div className="info">
            <h4>{item.name.length > 40 ? item.name.substring(0, 40) + ' ...' : item.name}</h4>
            <p className="category">{item.category}</p>
            <div className="bottom-row">
              <p className="price">{item.price}</p>
              <button className="arrow">→</button>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p>No products found in this category.</p>
    )}
  </div>
)}


{/* Best Sellers */}
<div className="bestseller-header">
  <h3>Best Sellers</h3>
  <div className="scroll-buttons">
    <button onClick={() => scrollBestSellers("left")}>‹</button>
    <button onClick={() => scrollBestSellers("right")}>›</button>
  </div>
</div>

<div className="bestseller-row" ref={bestSellerRef}>
  {Array.isArray(products) && products.length > 0 ? (
    products.map((item, index) => (
      <Link to={`/product/details/${item._id}`} className="bestseller-card" key={index}>
        <img className="bestseller-img" src={item.image_url} alt={item.name} />
        <div className="bestseller-info">
          <h4>{item.name.length > 40 ? item.name.substring(0, 40) + ' ...' : item.name}</h4>
          <p className="category">{item.category}</p>
          <div className="rating-row">
            <span className="stars">⭐ ⭐ ⭐ ⭐ ⭐</span>
            <span className="score">({item.rating})</span>
          </div>
        </div>
        <button className="arrow small-arrow">→</button>
      </Link>
    ))
  ) : (
    <p>No best sellers available.</p>
  )}
</div>


<h3>New Arrivals</h3>
  <div className="scroll-cards">
    {Array.isArray(products) && products.length > 0 ? (
      products.map((item, index) => (
        <Link to={`/product/details/${item._id}`} className="product-card-modern" key={index}>
          <div className="image-wrapper">
            <img src={item.image_url} alt={item.name} />
            <div className="top-tags">
              {item.badge && <span className="badge">{item.badge}</span>}
              {item.rating && (
                <span className="rating">⭐ {item.rating}</span>
              )}
            </div>
          </div>
          <div className="info">
            <h4>{item.name.length > 40 ? item.name.substring(0, 40) + ' ...' : item.name}</h4>
            <p className="category">{item.category}</p>
            <div className="bottom-row">
              <p className="price">{item.price}</p>
              <button className="arrow">→</button>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p>No products found in this category.</p>
    )}
  </div>

    </div>
  );
}