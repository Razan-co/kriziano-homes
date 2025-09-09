import { create } from 'zustand';

const dummyCart = [
  {
    id: 1,
    name: "BriarWood Decorative Chair",
    category: "Furniture",
    price: 1085,
    originalPrice: 3000,
    image: "https://i.imgur.com/4dQbFZB.png",
  },
  {
    id: 2,
    name: "BriarWood Decorative Chair",
    category: "Furniture",
    price: 185,
    image: "https://i.imgur.com/7HLgY3I.png",
  },
  {
    id: 3,
    name: "BriarWood Decorative Chair",
    category: "Decor",
    price: 185,
    image: "https://i.imgur.com/XGJlq1a.png",
  },
  {
    id: 4,
    name: "BriarWood Decorative Chair",
    category: "Furniture",
    price: 185,
    image: "https://i.imgur.com/4dQbFZB.png",
  },
];

const useCartStore = create((set) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  selectedItems: JSON.parse(localStorage.getItem("selectedItems") || '[]'),
  isLoading: false,

  addToCart: (product) => {
    const cart = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
    cart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cart))
  },

  toggleItem: (id) =>
    
  set((state) => {
    let updatedSelected;

    if (state.selectedItems.includes(id)) {
      // remove
      updatedSelected = state.selectedItems.filter((itemId) => itemId !== id);
    } else {
      // add
      updatedSelected = [...state.selectedItems, id];
    }

    // persist to localStorage
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelected));

    return { selectedItems: updatedSelected }
  }),

  // toggleItem: (id) =>
  //   set((state) => ({
  //     selectedItems: state.selectedItems.includes(id)
  //       ? state.selectedItems.filter((itemId) => itemId !== id)
  //       : [...state.selectedItems, id],
  //     // selectedItems: state.selectedItems.includes(id)
  //     //   ? state.selectedItems.filter((itemId) => itemId !== id)
  //     //   : [...state.selectedItems, id],
  //   })),

  deleteItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
      selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
    })),
  removeCart: (id) => {
 set((state) => {
    const updatedCart = state.cartItems.filter((item) => item._id !== id)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    return {
      cartItems: updatedCart,
      selectedItems: state.selectedItems.filter((itemId) => itemId !== id)
    }
  })
  },
  fetchCart: async () => {
    set({ isLoading: true });

    // Simulate async delay
    //await new Promise((res) => setTimeout(res, 1000));

    // set({
    //   cartItems: dummyCart,
    //   isLoading: false,
    // });
  },
}))

export default useCartStore


// import { create } from 'zustand';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const useCartStore = create((set) => ({
//   cartItems: [],
//   selectedItems: [],
//   isLoading: false,

//   // Set selected / deselected
//   toggleItem: (id) =>
//     set((state) => ({
//       selectedItems: state.selectedItems.includes(id)
//         ? state.selectedItems.filter((itemId) => itemId !== id)
//         : [...state.selectedItems, id],
//     })),

//   // Remove from cart
//   deleteItem: (id) =>
//     set((state) => ({
//       cartItems: state.cartItems.filter((item) => item.id !== id),
//       selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
//     })),

//   // 🟢 Fetch from API
//   fetchCart: async () => {
//     set({ isLoading: true });

//     try {
//       const response = await axios.get('/api/cart'); // replace with your API
//       set({
//         cartItems: response.data.cartItems, // assuming API returns { cartItems: [...] }
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error('Cart fetch failed:', error);
//       toast.error('Failed to load cart');
//       set({ cartItems: [], isLoading: false });
//     }
//   },
// }));

// export default useCartStore;