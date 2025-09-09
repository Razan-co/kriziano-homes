import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// Update path
import '../css/Signup.css';
import { useAuthStore } from '../store/authUser';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isSigningUp, user } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };
    await signup(payload)
  }

  useEffect(() => {
    if (user){
      navigate('/')
    }
  }, [user])

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src="/assets/Kriziano Homes logo.png" alt="Kriziano Homes" />
        </div>
        <h2 className="signup-title">Signup</h2>
        <p className="signup-subtitle">Enter your email and password to sign up</p>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button className="signup-btn" type="submit" disabled={isSigningUp}>
            {isSigningUp ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <p className="signup-or">Or login with</p>
        <div className="login-socials">
          <button className="social-btn google"><FaGoogle /></button>
          <button className="social-btn fb"><FaFacebookF /></button>
          <button className="social-btn apple"><FaApple /></button>
        </div>
        <p className="signup-footer">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="signup-link">Login</span>
        </p>
      </div>
    </div>
  );
}
