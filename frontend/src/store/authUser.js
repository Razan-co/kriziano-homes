import { create } from 'zustand';
import axios from 'axios';
import ApiEndpoints from '../endpoints/endpoints';

// Utility: Fetch user info from localStorage if available
const getUserFromStorage = () => {
  const userStr = localStorage.getItem('authUser');
  if (!userStr) {  // Checks for null, undefined, or empty string
    return null;
  }
  try {
    return JSON.parse(userStr);
  } catch (e) {
    // In case the stored string is invalid JSON, clear it and return null
    localStorage.removeItem('authUser');
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  authError: null,

  // Handle new user registration
  signup: async (payload) => {
    set({ isSigningUp: true, authError: null });
    try {
      const { data } = await axios.post(
        ApiEndpoints.REGISTER,
        payload,
        { withCredentials: true }
      );

      set({
        user: data.user,
        isAuthenticated: true,
        isSigningUp: false,
      });
      localStorage.setItem('authUser', JSON.stringify(data.user));
    } catch (err) {
      set({
        authError: err?.response?.data?.message || 'Signup failed',
        isSigningUp: false,
      });
    }
  },

  // Handle user login
  login: async (payload) => {
    set({ isLoggingIn: true, authError: null });
    try {
      const { data } = await axios.post(
        ApiEndpoints.LOGIN,
        payload,
        { withCredentials: true }
      );

      set({
        user: data.user,
        isAuthenticated: true,
        isLoggingIn: false,
      });
      localStorage.setItem('authUser', JSON.stringify(data.user));
    } catch (err) {
      set({
        authError: err?.response?.data?.message || 'Login failed',
        isLoggingIn: false,
      });
    }
  },

  // Check if token cookie is still valid on refresh
  getUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await axios.get(
        ApiEndpoints.GET_USER,
        { withCredentials: true }
      );

      set({
        user: data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      localStorage.setItem('authUser', JSON.stringify(data.user));
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
      localStorage.removeItem('authUser');
    }
  },

  // Handle logout
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(
        '', // <-- Fill with /logout endpoint (optional)
        {},
        { withCredentials: true }
      );
    } catch (_) {
      // Optionally handle logout failure
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoggingOut: false,
      });
      localStorage.removeItem('authUser');
    }
  },

  // Utility to manually update user object in store
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  },
}));

export default useAuthStore;




// // authStore.js
// import axios from "axios";
// import toast from "react-hot-toast";
// import { create } from "zustand";
// import EndPoints from '../endpoints/endpoints'

// export const useAuthStore = create((set) => ({
//   user: null,
//   //token: localStorage.getItem("token") || null,
//   isSigningUp: false,
//   isCheckingAuth: true,
//   isLoggingOut: false,
//   isLoggingIn: false,

//   setUser: (user) => set({ user }),
//   signup: async (credentials) => {
//     set({ isSigningUp: true });
//     try {
//       const response = await axios.post(EndPoints.REGISTER, credentials,{withCredentials:true});
//       const { user } = response.data;
//       //localStorage.setItem("token", token); // Store token
//       set({ user, isSigningUp: false });
//       toast.success("Account created successfully");
//     } catch (error) {
//       console.log(error.response.data)
//       set({ user: null, isSigningUp: false });
//       toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "An error occurred");
//     }
//   },

//   login: async (credentials) => {
//     set({ isLoggingIn: true });
//     try {
//       const response = await axios.post(EndPoints.LOGIN, credentials,{withCredentials:true});
//       const { user } = response.data;
//       //localStorage.setItem("token", token); // Store token
//       set({ user, isLoggingIn: false });
//       toast.success("Logged in successfully")
//     } catch (error) {
//       set({ user: null, token: null, isLoggingIn: false });
//       toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "Login failed");
//     }
//   },

//   logout: async () => {
//     set({ isLoggingOut: true });
//     try {
//       await axios.post("/user/auth/logout");
//       ///localStorage.removeItem("token"); // Remove token
//       set({ user: null, token: null, isLoggingOut: false });
//       toast.success("Logged out successfully");
//     } catch (error) {
//       set({ isLoggingOut: false });
//       toast.error(error.response?.data?.message || "Logout failed");
//     }
//   },
//    getUser: async (credentials) => {
//     // set({ isLoggingIn: true });
//     // try {
//     //   const response = await axios.get(EndPoints.GET_USER,{withCredentials:true});
//     //   const { user } = response.data
//     //   //localStorage.setItem("token", token); // Store token
//     //   set({ user })
//     //  // toast.success("Logged in successfully")
//     // } catch (error) {
//     //   set({ user: null, token: null, isLoggingIn: false });
//     //   //toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "Login failed");
//     // }
//   },
// }));
