import React, { useState } from "react";
import useAdminStore from "../store/useAdminStore";
import AdminSidebar from "./AdminSidebar";

export default function AddProductFormDashboard() {
  const { addProduct, loading } = useAdminStore();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    colors: "",
    sizes: "",
    description: "",
    image: null,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setProduct({ ...product, [name]: files[0] });
    else setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addProduct(product);

    if (res.success) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setProduct({
          name: "",
          price: "",
          colors: "",
          sizes: "",
          description: "",
          image: null,
        });
      }, 2000);
    } else {
      alert("Failed to add product: " + res.error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 relative">
        <h1 className="text-xl font-semibold mb-6">Add Product</h1>

        <div className="max-w-3xl bg-white rounded-lg shadow-md p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Content */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Upload Image */}
              <div className="w-full sm:w-1/3 flex items-center justify-center border rounded-lg bg-gray-100 h-40">
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  {product.image ? (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <span>Upload Image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Form Fields */}
              <div className="w-full sm:w-2/3 space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
                <input
                  type="text"
                  name="colors"
                  placeholder="Colors (comma separated)"
                  value={product.colors}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
                <input
                  type="text"
                  name="sizes"
                  placeholder="Sizes (comma separated)"
                  value={product.sizes}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              className="w-full border rounded-md p-3 h-28"
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-md text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                onClick={() =>
                  setProduct({
                    name: "",
                    price: "",
                    colors: "",
                    sizes: "",
                    description: "",
                    image: null,
                  })
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Success Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 px-4">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 text-center w-full max-w-sm">
              <p className="text-gray-800 text-lg font-medium">
                Product Added Successfully!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
