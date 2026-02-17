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
      await axios.get(
         ApiEndpoints.LOGOUT,
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


