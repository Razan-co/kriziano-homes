import {create} from'zustand'

const useCartStore = create((set) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  selectedItems: JSON.parse(localStorage.getItem('selectedItems') || '[]'),
  isLoading: false,

  addToCart: (product) => {
    set((state) => {
      const updatedCart = [...state.cartItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },

  toggleItem: (id) => set((state) => {
    let updatedSelected;
    if (state.selectedItems.includes(id)) {
      updatedSelected = state.selectedItems.filter(itemId => itemId !== id);
    } else {
      updatedSelected = [...state.selectedItems, id];
    }
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelected));
    return { selectedItems: updatedSelected };
  }),

  removeCart: (id) => set((state) => {
    const updatedCart = state.cartItems.filter(item => item._id !== id);
    const updatedSelected = state.selectedItems.filter(itemId => itemId !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelected));
    return { cartItems: updatedCart, selectedItems: updatedSelected };
  }),

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      // Optional: fetch from API. Else just rehydrate cartItems from localStorage here:
      const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      set({ cartItems: storedCart, isLoading: false });
    } catch (error) {
      set({ cartItems: [], isLoading: false });
    }
  },

}));


export default useCartStore