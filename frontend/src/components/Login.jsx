import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import '../css/login.css';
import { useAuthStore } from '../store/authUser';

export default function LoginKI() {
  const navigate = useNavigate();
  const { login, isLoggingIn, user, authError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      let error = '';
      switch (name) {
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
        default:
          break;
      }
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    let error = '';
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setFormErrors(errors);
    setTouched({
      email: true,
      password: true,
    });
    return !Object.values(errors).some((error) => error !== '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await login(formData);
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === '') &&
      Object.values(formData).every((field) => field.trim() !== '')
    );
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="logo">
          <img src="/assets/Kriziano Homes logo.png" alt="Kriziano Homes" />
        </div>
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">Enter your email and password to log in</p>

        {authError && (
          <div className="error-message auth-error">
            {authError}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.email && touched.email ? 'error' : ''}
              required
            />
            {formErrors.email && touched.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.password && touched.password ? 'error' : ''}
              required
            />
            {formErrors.password && touched.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>

          <div className="login-options">
            <label className="label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn" disabled={isLoggingIn || !isFormValid()}>
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




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
// // ✅ Correct import
// import '../css/login.css';
// import { useAuthStore } from '../store/authUser';
// import { useEffect } from 'react';

// export default function LoginKI() {
//   const navigate = useNavigate();
//   const { login, isLoggingIn, user } = useAuthStore();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     await login(formData);
//   }

//   useEffect(() => {
//     if (user) navigate('/')
//   }, [user])

//   return (
//     <div className="login-background">
//       <div className="login-card">
//         <div className="logo">
//           <img src="/assets/Kriziano Homes logo.png" alt="Kriziano Homes" />
//         </div>
//         <h2 className="login-title">Login</h2>
//         <p className="login-subtext">Enter your email and password to log in</p>

//         <form className="login-form" onSubmit={handleLogin}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <div className="login-options">
//             <label className="lable">
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="#">Forgot Password?</a>
//           </div>
//           <button type="submit" className="login-btn" disabled={isLoggingIn}>
//             {isLoggingIn ? 'Logging in...' : 'Log In'}
//           </button>
//         </form>

//         <div className="divider">or login with</div>

//         <div className="login-socials">
//           <button className="social-btn google"><FaGoogle /></button>
//           <button className="social-btn fb"><FaFacebookF /></button>
//           <button className="social-btn apple"><FaApple /></button>
//         </div>

//         <p className="signup-text">
//           Don't have an account? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// }
