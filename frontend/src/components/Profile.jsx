import React from 'react'; 
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../css/profile.css';
import { useAuthStore } from '../store/authUser';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Fallbacks if user is not loaded
  const avatar = user?.avatar || '/assets/profile%20image.jpg';
  const name = user?.name || 'Guest User';
  const email = user?.email || 'example@email.com';

  return (
    <div className="profile-container">
      <div className="profile-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          <FaChevronLeft size={20} />
        </span>
        <h2>My Profile</h2> 
      </div>

      <div className="profile-content">
        <img
          src={avatar}
          alt="User"
          className="profile-avatar"
        />
        <h3 className="profile-name">{name}</h3>
        <p className="profile-email">{email}</p>

        <div className="account-section">
          <h4>Account</h4>
          <div className="account-option" onClick={() => navigate('/myorders')}>
            My Orders <span>›</span>
          </div>
          <div className="account-option" onClick={() => navigate('/address')}>
            Shipping Address <span>›</span>
          </div>
          <div className="account-option" onClick={() => navigate('/payment')}>
            Payment Method <span>›</span>
          </div>
          <div className="account-option" onClick={() => navigate('/reviews')}>
            My Reviews <span>›</span>
          </div>
          <div className="account-option" onClick={() => navigate('/settings')}>
            Settings <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
