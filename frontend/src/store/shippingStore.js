// store/shippingStore.js
import axios from 'axios';
import { create } from 'zustand';
import Endpoints from '../endpoints/endpoints';

export const useShippingStore = create((set) => ({
  addresses: [],
  selectedIndex: 0,

 getAddress: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(Endpoints.GET_ADDRESS)
            const { address } = response.data
            set({ addresses:  address, isLoading: false })
        } catch (error) {
            console.log(error.response.data)
            set({ address: [], isLoading: false })
        }
    },

     addAddress: async (address) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(Endpoints.ADD_ADDRESS, address)
            const { address } = response.data
            set({ address, isLoading: false })
        } catch (error) {
            console.log(error.response.data)
            set({ isLoading: false })
        }
    },

    // set((state) => ({
    //   addresses: [...state.addresses, address],
    // })),

  editAddress: (index, updatedAddress) =>
    set((state) => {
      const newAddresses = [...state.addresses];
      newAddresses[index] = updatedAddress;
      return { addresses: newAddresses };
    }),

  deleteAddress: (index) =>
    set((state) => {
      const newAddresses = state.addresses.filter((_, i) => i !== index);
      return {
        addresses: newAddresses,
        selectedIndex: Math.max(0, state.selectedIndex === index ? 0 : state.selectedIndex),
      };
    }),

  selectAddress: (index) => set({ selectedIndex: index }),
}));
