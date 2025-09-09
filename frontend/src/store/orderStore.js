import { create } from 'zustand';
import Endpoints from '../endpoints/endpoints';
import axios from 'axios';
import toast from 'react-hot-toast';


const useOrderStore = create((set) => ({
    addresses: [] || null,
    isLoading: false,
    orders: [],
    paymentStatus: null,
    getAddress: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(Endpoints.GET_ADDRESS, { withCredentials: true });
            const { addresses } = response.data;
            set({ addresses, isLoading: false });
        } catch (error) {
            console.log(error.response.data);
            set({ addresses: [], isLoading: false });
        }
    },

    addAddress: async (address) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(Endpoints.ADD_ADDRESS, address, { withCredentials: true })
            const { addresses } = response.data
            set({ addresses, isLoading: false })
        } catch (error) {
            console.log(error.response.data)
            set({ isLoading: false })
        }
    },

    // New - Create order
   createOrder: async (products, address) => {
    set({ isLoading: true, error: null })

    // Function to dynamically load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    try {
        // Load Razorpay script
        const isScriptLoaded = await loadRazorpayScript()
        if (!isScriptLoaded) {
            set({ isLoading: false, error: 'Razorpay SDK failed to load.' })
            toast.error('Razorpay SDK failed to load.')
            return
        }

        // products format: [{ productId: "", quantity: 0 }]
        const response = await axios.post(Endpoints.CREATE_ORDER, { products, address }, { withCredentials: true })
        const { orderId, razorpayOrderId, amount, currency, key } = response.data

        // Prepare Razorpay options
        const options = {
            key: key,
            amount: amount,
            currency: currency,
            name: 'Your Company Name',
            description: 'Order Payment',
            order_id: razorpayOrderId,
            handler: async function (razorpayResponse) {
                // Call verify payment API or Zustand verifyPayment function here
                await useOrderStore.getState().verifyPayment(orderId, razorpayResponse)
            },
            prefill: {
                // Prefill data if available
            },
            theme: {
                color: '#F37254'
            }
        }

        // Open Razorpay checkout UI
        const rzp = new window.Razorpay(options)
        rzp.open()

        set((state) => ({
            orders: [...state.orders, { id: orderId, razorpayOrderId, status: 'pending' }],
            isLoading: false
        }))
    } catch (error) {
        set({ isLoading: false, error: error?.response?.data || error })
        toast.error(error.response?.data?.message || error.response.data.errors[0].msg || "Order creation failed")
    }
},

    // New - Verify payment
    verifyPayment: async (orderId, paymentDetails) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(Endpoints.VERIFY_PAYMENT, { orderId, paymentDetails }, { withCredentials: true });
            const { status } = response.data;
            set({
                paymentStatus: status,
                isLoading: false,
                error: null
            });
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data || error });
        }
    },
}))

export default useOrderStore