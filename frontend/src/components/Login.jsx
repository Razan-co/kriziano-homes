import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
// ✅ Correct import
import '../css/login.css';
import { useAuthStore } from '../store/authUser';
import { useEffect } from 'react';

export default function LoginKI() {
  const navigate = useNavigate();
  const { login, isLoggingIn, user } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData);
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="logo">
          <img src="/assets/Kriziano Homes logo.png" alt="Kriziano Homes" />
        </div>
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">Enter your email and password to log in</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <div className="login-options">
            <label className="lable">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="divider">or login with</div>

        <div className="login-socials">
          <button className="social-btn google"><FaGoogle /></button>
          <button className="social-btn fb"><FaFacebookF /></button>
          <button className="social-btn apple"><FaApple /></button>
        </div>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
