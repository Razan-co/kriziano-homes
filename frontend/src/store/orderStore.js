import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import Endpoints from '../endpoints/endpoints';

const useOrderStore = create((set) => ({
  addresses: [],
  orders: [],
  isLoading: false,
  paymentStatus: null,
  createdOrder: null,
  razorpayOrderInfo: null,
  error: null,

  // Fetch user addresses
  getAddress: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(Endpoints.GET_ADDRESS, { withCredentials: true });
      set({ addresses: data.addresses, isLoading: false });
    } catch (error) {
      console.error(error.response?.data);
      set({ addresses: [], isLoading: false });
    }
  },

  // Add new address
  addAddress: async (address) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.post(Endpoints.ADD_ADDRESS, address, { withCredentials: true });
      set({ addresses: data.addresses, isLoading: false });
    } catch (error) {
      console.error(error.response?.data);
      set({ isLoading: false });
    }
  },

  // Create a new order
  createOrder: async (products, address) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post(
        Endpoints.CREATE_ORDER,
        { products, address },
        { withCredentials: true }
      );

      set({
        createdOrder: data,
        razorpayOrderInfo: {
          orderId: data.orderId,
          razorpay_order_id: data.razorpay_order_id,
          amount: data.amount,
          currency: data.currency,
          key: data.key,
        },
        isLoading: false,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        'Order creation failed'
      );
      set({ isLoading: false, error });
    }
  },

  // Verify Razorpay Payment
  verifyPayment: async (razorpayResponse) => {
    set({ isLoading: true });
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = razorpayResponse;

      const { data } = await axios.post(
        Endpoints.VERIFY_PAYMENT,
        { razorpay_order_id, razorpay_payment_id, razorpay_signature },
        { withCredentials: true }
      );

      toast.success('Payment verified successfully!');
      set({
        paymentStatus: data.message,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      toast.error('Payment verification failed');
      set({ isLoading: false });
    }
  },

  // Fetch all orders for current user
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(Endpoints.GET_USER_ORDERS, { withCredentials: true });
      set({ orders: data.orders || [], isLoading: false });
    } catch (error) {
      toast.error('Failed to fetch orders');
      set({ orders: [], isLoading: false, error });
    }
  },

  // Fetch orders filtered by status ('pending', 'processing', 'delivered', 'cancelled')
  fetchOrdersByStatus: async (status) => {
    set({ isLoading: true, error: null });
    try {
      const url = status ? `${Endpoints.GET_USER_ORDERS}?status=${status}` : Endpoints.GET_USER_ORDERS;
      const { data } = await axios.get(url, { withCredentials: true });
      set({ orders: data.orders || [], isLoading: false });
    } catch (error) {
      toast.error('Failed to fetch orders');
      set({ orders: [], isLoading: false, error });
    }
  },

  // Reset createdOrder and payment status (after success)
  resetOrderState: () => {
    set({
      createdOrder: null,
      razorpayOrderInfo: null,
      paymentStatus: null,
      error: null,
    });
  },
}));

export default useOrderStore;
