import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Homepage';
import Furniture from './components/Furniture';
import Kitchen from './components/Kitchen';
import DecorPillow from './components/DecorPillow';
import Lighting from './components/Lighting';
import Outdoor from './components/Outdoor';
import Storage from './components/Storage';
import Bedbath from './components/BedBath';
import Pet from './components/Pet';
import Header from './components/Header';
import Category from './components/Category';
import Profile from './components/Profile';
import Login from './components/Login';
import Notification from './components/Notification';
import Signup from './components/Signup';
import BabyKids from './components/BabyKids';
import Cloths from './components/Cloths';
import Deals from './components/Deals';
import ShippingAddressForm from './components/ShippingAddressForm'
import ShippingAddress from './components/ShippingAddress'
import HomeSreen from './pages/HomeSreen';
import MyOrders from './components/MyOrders';
import Rating from './components/Rating';
import Cart from './components/Cart';
import Product from './components/Product';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import OrderSuccess from './components/OrderSuccess';


function AppWrapper() {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/signup', '/profile', '/category',
    , '/address', '/notification'];
 const { getUser, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    getUser()
  }, [getUser])

  if (isCheckingAuth) {
    return <div>Loading user session...</div>;
  }
  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<HomeSreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/category-products" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Category />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/decor&pillow" element={<DecorPillow />} />
        <Route path="/lighting" element={<Lighting />} />
        <Route path="/outdoor" element={<Outdoor />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/bed&bath" element={<Bedbath />} />
        <Route path="/baby&kids" element={<BabyKids />} />
        <Route path="/address" element={<ShippingAddressForm />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/cloths" element={<Cloths />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/shaddress" element={<ShippingAddress />} />
        <Route path="/reviews" element={<Rating />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:categoryName" element={<Product />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
