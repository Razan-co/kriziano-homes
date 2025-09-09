import { create } from 'zustand';
import Endpoints from '../endpoints/endpoints';
import axios from 'axios';


export const useCategoryStore = create((set) => ({
  category: '',
  categories:[],
  products: [],
  products:{},
  isLoading: false,

  setCategory: async (categoryName) => {
    set({ isLoading: true, category: categoryName, products: [] });

    // Simulate loading delay
    await new Promise((res) => setTimeout(res, 500));

    

    // Dummy product list
    const dummyProducts = [
      {
        name: 'Modern Chair',
        image: '/assets/furniture2.jpg',
        rating: 4.5,
        price: '₹4,999',
        category: categoryName,
        badge: 'New',
        description: 'edfghjdcfvghjdfghjrtyuirfhjkdfgh',
      },
      {
        name: 'ClassicSofa',
        image: '/assets/furniture2.jpg',
        rating: 4.2,
        price: '₹9,499',
        category: categoryName,
        badge: 'Best Seller',
        description: 'edfghjdcfvghjdfghjrtyuirfhjkdfgh',
      },
      {
        name: 'Study Table',
        image: '/assets/furniture2.jpg',
        rating: 4.8,
        price: '₹3,299',
        category: categoryName,
        badge: 'Limited Offer',
        description: 'edfghjdcfvghjdfghjrtyuirfhjkdfgh',
      },
      {
        name: 'Study Table',
        image: '/assets/furniture2.jpg',
        rating: 4.8,
        price: '₹3,299',
        category: categoryName,
        badge: 'Limited Offer',
        description: 'edfghjdcfvghjdfghjrtyuirfhjkdfgh',
      },
      {
        name: 'Study Table',
        image: '/assets/furniture2.jpg',
        rating: 4.8,
        price: '₹3,299',
        category: categoryName,
        badge: 'Limited Offer',
        description: 'edfghjdcfvghjdfghjrtyuirfhjkdfgh',
      },
    ];

    // set({
    //   products: dummyProducts,
    //   isLoading: false,
    // });
  },

   getProducts: async (page,search,category) => {
    set({ isLoading: true })
    try {
      const response = await axios.get(Endpoints.GET_PRODUCTS(page,search,category))
      console.log(Endpoints.GET_PRODUCTS(page,search,category))
      const { products } = response.data
      set({ products, isLoading: false })
      //console.log(products)
    } catch (error) {
      console.log(error.response.data)
      set({ isLoading: false })
     // toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "An error occurred");
    }
  },

  getCategories:async ()=>{
     set({ isLoading: true })
    try {
      const response = await axios.get(Endpoints.GET_CATEGORIES)
      const { categories } = response.data
      set({ categories, isLoading: false })
    } catch (error) {
      console.log(error.response.data)
      set({ isLoading: false })
     // toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "An error occurred");
    }
  },

  getSingleProduct:async (product_id)=>{
  set({ isLoading: true })
    try {
      const response = await axios.get(Endpoints.GET_SINGLE_PRODUCT(product_id))
      const { product } = response.data
      set({ product, isLoading: false })
    } catch (error) {
      console.log(error.response.data)
      set({ isLoading: false })
     // toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "An error occurred");
    }
  }
}));