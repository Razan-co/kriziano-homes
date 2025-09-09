import React, { useState } from 'react';
import '../css/CreatePassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function CreatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="create-wrapper">
      <div className="form-container">
        <img src="/assets/logo.png" alt="Logo" className="logo-img" />

        <h2 className="title">Create Password</h2>
        <p className="subtitle">Enter your new password to log in</p>

        <input type="email" placeholder="Email id" className="input-field" />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="input-field"
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="password-wrapper">
          <input
            type={showRePassword ? "text" : "password"}
            placeholder="Re-Enter Password"
            className="input-field"
          />
          <span
            className="toggle-eye"
            onClick={() => setShowRePassword(!showRePassword)}
          >
            {showRePassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="reset-btn">Reset Password</button>

        <p className="signup-text">
          Don’t have an account? <span className="signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  );
}