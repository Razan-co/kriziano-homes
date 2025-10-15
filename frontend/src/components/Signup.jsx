import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';
import  useAuthStore  from '../store/authUser';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isSigningUp, user, authError } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    phone: false,
  });

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 2) return 'Full name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'Full name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit Indian phone number';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (touched[name]) {
      let error = '';
      switch (name) {
        case 'fullName':
          error = validateFullName(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
        case 'phone':
          error = validatePhone(value);
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

    // Validate on blur
    let error = '';
    switch (name) {
      case 'fullName':
        error = validateFullName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'phone':
        error = validatePhone(value);
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
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      phone: validatePhone(formData.phone),
    };

    setFormErrors(errors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      phone: true,
    });

    return !Object.values(errors).some(error => error !== '');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const payload = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone,
    };

    await signup(payload);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const isFormValid = () => {
    return Object.values(formErrors).every(error => error === '') && 
           Object.values(formData).every(field => field.trim() !== '');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src="/assets/Kriziano Homes logo.png" alt="Kriziano Homes" />
        </div>
        <h2 className="signup-title">Signup</h2>
        <p className="signup-subtitle">Enter your details to create an account</p>
        
        {authError && (
          <div className="error-message auth-error">
            {authError}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.fullName && touched.fullName ? 'error' : ''}
              required
            />
            {formErrors.fullName && touched.fullName && (
              <span className="error-message">{formErrors.fullName}</span>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Id"
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

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={formErrors.phone && touched.phone ? 'error' : ''}
              required
            />
            {formErrors.phone && touched.phone && (
              <span className="error-message">{formErrors.phone}</span>
            )}
          </div>

          <button 
            className="signup-btn" 
            type="submit" 
            disabled={isSigningUp || !isFormValid()}
          >
            {isSigningUp ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="signup-or">Or signup with</p>
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



// import React, { useEffect, useState } from 'react';
// import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// // Update path
// import '../css/Signup.css';
// import { useAuthStore } from '../store/authUser';

// export default function Signup() {
//   const navigate = useNavigate();
//   const { signup, isSigningUp, user } = useAuthStore();

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     phone: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const payload = {
//       name: formData.fullName,
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone,
//     };
//     await signup(payload)
//   }

//   useEffect(() => {
//     if (user){
//       navigate('/')
//     }
//   }, [user])

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <div className="logo">
//           <img src="/assets/Kriziano Homes logo.png" alt="Kriziano Homes" />
//         </div>
//         <h2 className="signup-title">Signup</h2>
//         <p className="signup-subtitle">Enter your email and password to sign up</p>
//         <form className="signup-form" onSubmit={handleSignup}>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Id"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <button className="signup-btn" type="submit" disabled={isSigningUp}>
//             {isSigningUp ? 'Signing up...' : 'Signup'}
//           </button>
//         </form>
//         <p className="signup-or">Or login with</p>
//         <div className="login-socials">
//           <button className="social-btn google"><FaGoogle /></button>
//           <button className="social-btn fb"><FaFacebookF /></button>
//           <button className="social-btn apple"><FaApple /></button>
//         </div>
//         <p className="signup-footer">
//           Already have an account?{' '}
//           <span onClick={() => navigate('/login')} className="signup-link">Login</span>
//         </p>
//       </div>
//     </div>
//   );
// }
