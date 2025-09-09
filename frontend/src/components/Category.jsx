import React from "react";
import "../css/category.css";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaArrowRight } from "react-icons/fa";
import { useCategoryStore } from "../store/categoryStore";

const departments = [
  { name: "Furnitures", image: "/assets/Furniture.png", path: "furniture" },
  { name: "Bed & Bath", image: "/assets/Bed&Bath.png", path: "bed&bath" },
  { name: "Outdoor", image: "/assets/Outdoor.png", path: "outdoor" },
  { name: "Kitchen", image: "/assets/Kitchen.png", path: "kitchen" },
  { name: "Decor & Pillow", image: "/assets/Decor&Pillow.png", path: "decor&pillow" },
  { name: "Storage", image: "/assets/Storage.png", path: "storage" },
  { name: "Lighting", image: "/assets/Lighting.png", path: "lighting" },
  { name: "Pet", image: "/assets/Pet.png", path: "pet" },
];

export default function Category() {
  const half = Math.ceil(departments.length / 2);
  const left = departments.slice(0, half);
  const right = departments.slice(half);
  const navigate = useNavigate();
  const { setCategory } = useCategoryStore();

  const handleDepartmentClick = async (catName) => {
    try {
      await setCategory(catName);
      // Save to localStorage for page reload persistence
      const currentStore = useCategoryStore.getState();
      localStorage.setItem("categoryStore", JSON.stringify(currentStore));
      navigate("/category-products");
    } catch (error) {
      console.error("Failed to set category:", error);
    }
  };

  return (
    <div className="departments-container">
      <div className="departments-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaChevronLeft size={20} />
        </span>
        <h2>All Departments</h2>
      </div>

      <div className="departments-columns">
        {[left, right].map((column, colIdx) => (
          <div className="column" key={colIdx}>
            {column.map((item, index) => (
              <div
                className="department-card"
                key={index}
                onClick={() => handleDepartmentClick(item.name)}
              >
                <img src={item.image} alt={item.name} className="department-image" />
                <span>{item.name}</span>
                <FaArrowRight className="arrow-icon" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
