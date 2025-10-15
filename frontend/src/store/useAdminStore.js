// src/store/useAdminStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE_PRODUCT = "http://localhost:8000/api/admin/product";
const API_BASE_ORDER = "http://localhost:8000/api/admin/order";

const useAdminStore = create((set, get) => ({
  // =====================
  // PRODUCTS
  // =====================
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_BASE_PRODUCT);
      set({ products: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("colors", product.colors);
      formData.append("sizes", product.sizes);
      formData.append("description", product.description);
      if (product.image) formData.append("image", product.image);

      const res = await axios.post(`${API_BASE_PRODUCT}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await get().fetchProducts(); // refresh products
      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Add product failed:", err);
      return { success: false, error: err.message };
    }
  },

  removeProduct: async (id) => {
    try {
      await axios.delete(`${API_BASE_PRODUCT}/${id}`);
      set({ products: get().products.filter((p) => p.id !== id) });
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  },

// =====================
// ORDERS
// =====================
orders: [],
loadingOrders: false,

fetchOrders: async () => {
  set({ loadingOrders: true });
  try {
    const res = await axios.get(API_BASE_ORDER);
    set({ orders: res.data.orders || res.data, loadingOrders: false });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    set({ loadingOrders: false });
  }
},

fetchDeliveredOrders: async () => {
  try {
    const res = await axios.get(`${API_BASE_ORDER}/delivered`);
    set({ orders: res.data.orders || res.data });
  } catch (error) {
    console.error("❌ Error fetching delivered orders:", error);
  }
},

fetchPendingOrders: async () => {
  try {
    const res = await axios.get(`${API_BASE_ORDER}/pending`);
    set({ orders: res.data.orders || res.data });
  } catch (error) {
    console.error("❌ Error fetching pending orders:", error);
  }
},

fetchCancelledOrders: async () => {
  try {
    const res = await axios.get(`${API_BASE_ORDER}/cancelled`);
    set({ orders: res.data.orders || res.data });
  } catch (error) {
    console.error("❌ Error fetching cancelled orders:", error);
  }
},

}));

export default useAdminStore;
