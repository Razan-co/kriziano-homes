import React, { useEffect } from "react";
import useAdminStore from "../store/useAdminStore";
import AdminSidebar from "./AdminSidebar";

export default function Admin() {
  const { products, fetchProducts, loading, error } = useAdminStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-xl font-semibold mb-6">Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-start gap-4"
            >
              {/* Product Image */}
              <img
                src={product.img || product.image_url}
                alt={product.name}
                className="w-full sm:w-32 sm:h-32 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold mb-3">₹{product.price}</p>

                {/* Colors */}
                {product.colors && (
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {product.colors.split(",").map((c, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-full border"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && (
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.split(",").map((s, i) => (
                      <button
                        key={i}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
