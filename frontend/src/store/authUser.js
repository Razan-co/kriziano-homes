// authStore.js
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import EndPoints from '../endpoints/endpoints'

export const useAuthStore = create((set) => ({
  user: null,
  //token: localStorage.getItem("token") || null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  setUser: (user) => set({ user }),
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(EndPoints.REGISTER, credentials,{withCredentials:true});
      const { user } = response.data;
      //localStorage.setItem("token", token); // Store token
      set({ user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error.response.data)
      set({ user: null, isSigningUp: false });
      toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "An error occurred");
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(EndPoints.LOGIN, credentials,{withCredentials:true});
      const { user } = response.data;
      //localStorage.setItem("token", token); // Store token
      set({ user, isLoggingIn: false });
      toast.success("Logged in successfully")
    } catch (error) {
      set({ user: null, token: null, isLoggingIn: false });
      toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/user/auth/logout");
      ///localStorage.removeItem("token"); // Remove token
      set({ user: null, token: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
   getUser: async (credentials) => {
    // set({ isLoggingIn: true });
    // try {
    //   const response = await axios.get(EndPoints.GET_USER,{withCredentials:true});
    //   const { user } = response.data
    //   //localStorage.setItem("token", token); // Store token
    //   set({ user })
    //  // toast.success("Logged in successfully")
    // } catch (error) {
    //   set({ user: null, token: null, isLoggingIn: false });
    //   //toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "Login failed");
    // }
  },
}));
